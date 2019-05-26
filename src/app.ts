import express, { response } from "express";
import { resolve } from "url";
const fetch = require("node-fetch");
const axios = require("axios");
const request = require("request");
const path = require("path");
const fs = require("fs");

const app = express();
const port = 3000;
app.get("/", (req, res) => {
  res.send("The sedulous hyena ate the antelope!");
});

app.get("/api/user/:userId", (req, res) => {
  let userId = req.params.userId;
  fetch(`https://reqres.in/api/users/${userId}`)
    .then(response => {
      return response.json();
    })
    .then(result => {
      res.send(result);
    });
});

app.get("/api/user/:userId/avatar", (req, res) => {
  let userId = req.params.userId;
  fetch(`https://reqres.in/api/users/${userId}`)
    .then(response => {
      return response.json();
    })
    .then(result => {
      let fileId = `${result.data.id}.png`;
      if (fs.existsSync(fileId)) {
        var imageAsBase64 = fs.readFileSync(fileId, "base64");
        res.send(imageAsBase64);
      } else {
        request(
          {
            url: result.data.avatar,
            //make the returned body a Buffer
            encoding: null
          },
          function(error, response, body) {
            //will be true, body is Buffer( http://nodejs.org/api/buffer.html )
            console.log(body instanceof Buffer);

            //do what you want with body
            //like writing the buffer to a file
            fs.writeFile(
              fileId,
              body,
              {
                encoding: null
              },
              function(err) {
                if (err) throw err;
                console.log("It's saved!");
                res.send("File Saved!");
              }
            );
          }
        );
      }
    });
});

app.delete("/api/user/:userId/avatar", (req, res) => {
  let userId = req.params.userId;
  fetch(`https://reqres.in/api/users/${userId}`)
    .then(response => {
      return response.json();
    })
    .then(result => {
      let fileId = `${result.data.id}.png`;
      if (fs.existsSync(fileId)) {
        fs.unlinkSync(`${result.data.id}.png`);
        res.send("File Deleted");
      }
    });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
