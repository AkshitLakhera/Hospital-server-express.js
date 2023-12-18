// *
// TODO :

// You need to create 4 routes(4 things that the hospital can do)

//     GET - User can check how many kidneys they have and their health
//     POST - User can add a new kidney
//     PUT - User can replace a kidney, make it healthy
//     DELETE - User can remove a kidney
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const users = [
  {
    name: "john",
    kidneys: [
      {
        healthy: false,
      },
    ],
  },
];
//                       Adding get request                                           //
app.get("/", function (req, res) {
  const kidney = users[0].kidneys;
  const numberofkidneys = kidney.length;
  const healthresult = users[0].kidneys.filter(checkhealth);
  const nohealthykidneys = healthresult.length;
  function checkhealth(kidney) {
    return kidney.healthy ? 1 : 0;
  }
  const numberofunhealthykidney = numberofkidneys - nohealthykidneys;
  res.json({
    numberofkidneys,
    nohealthykidneys,
    numberofunhealthykidney,
  });
});
app.listen(3000, () => {
  console.log("server is running  on port 3000");
});
//                                  Adding post request                    //
app.post("/", function (req, res) {
  const ishealthy = req.body.ishealthy;
  users[0].kidneys.push({
    healthy: ishealthy,
  });
  res.json({
    msg: "new kidney added",
  });
});

//                                Adding  put request                       //

app.put("/replace", function (req, res) {
  const healtresult = users[0].kidneys.filter(checkhealth);
  const nohealthykidneys = healtresult.length;
  function checkhealth(kidney) {
    if (kidney.healthy === false) {
      kidney.healthy = true;
    }
  }
  res.json({
    msg: "unhealthy kidneys are removed",
  });
});
//                        Adding  delte request           //
function isthereisatleastoneunhealthykidney() {
  let atleastoneunjealthykidney = false;
  for (let i = 0; i < users[0].kidneys.length; i++) {
    if (!users[0].kidneys.healthy) {
     return  atleastoneunjealthykidney = true;
      break;
    }
  }
}
app.delete("/delete", function (req, res) {
  if (isthereisatleastoneunhealthykidney) {
    const kidney = users[0].kidneys;
    const healthykidneys = [];
    kidney.filter(removeunhealthykidneys);
    // remove unhealthy kidney function
    function removeunhealthykidneys(kidney) {
      if (kidney.healthy === true) {
        healthykidneys.push(kidney);
      }
    }
    users[0].kidneys = healthykidneys;
    res.json({
      msg: "unhealthy kidney removed",
    });
  } else {
    res.json({
      msg: "you don't have any unhealthy kidney",
    });
  }
});
