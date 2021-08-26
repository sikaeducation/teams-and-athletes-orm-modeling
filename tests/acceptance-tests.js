const app = require("../app.js");
const request = require("supertest");
const assert = require("assert");
const fixtures = require("./fixtures");
const database = require("../data/database_connection");

describe("Team-Athletes API", function(){
    beforeEach(done => {
        database.seed.run().then(()=>{
            done();
        });
    });
    it("404s a non-matching route", function(done){
        request(app)
            .get("/doesntexist")
            .expect(404, done);
    });
    describe("teams routes", function(){
        it("return a list of teams", function(done){
            request(app)
                .get("/teams")
                .expect("Content-Type", "application/json; charset=utf-8")
                .expect(200)
                .then(response => {
                    assert.deepEqual(response.body.data.teams, fixtures.teams);
                    done();
                }).catch(done);
        });
        it("return a team", function(done){
            request(app)
                .get("/teams/2")
                .expect("Content-Type", "application/json; charset=utf-8")
                .expect(200)
                .then(response => {
                    assert.deepEqual(response.body.data.team, fixtures.teams[1]);
                    done();
                }).catch(done);
        });
        it("creates new teams", function(done){
            request(app)
                .post("/teams")
                .send({
                    name: "Jacksonville Jaguars"
                })
                .expect("Content-Type", "application/json; charset=utf-8")
                .expect(201)
                .then(response => {
                    assert.deepEqual(response.body.data.team, {
                        id: 5,
                        name: "Jacksonville Jaguars"
                    });
                    done();
                }).catch(done);
        });
        it("deletes a team", function(done){
            var req = request(app);
            req.delete("/teams/2")
                .expect(204)
                .then(() => {
                    return req.get("/teams/2").expect(404);
                }).then(response => {
                    done();
                }).catch(done);
        });
        it("updates a team", function(done){
            var req = request(app);
            req.put("/teams/2")
                .send({
                    name: "Jacksonville Jaguars"
                })
                .expect("Content-Type", "application/json; charset=utf-8")
                .expect(200)
                .then(response => {
                    assert.deepEqual(response.body.data.team, {
                        id: 2,
                        name: "Jacksonville Jaguars"
                    });
                    return;
                }).then(() => {
                    return req.get("/teams/2");
                }).then(response => {
                    assert.deepEqual(response.body.data.team, {
                        id: 2,
                        name: "Jacksonville Jaguars"
                    });
                    done();
                }).catch(done);
        });
        it("patches a team", function(done){
            var req = request(app);
            req.patch("/teams/2")
                .send({
                    name: "Jacksonville Jaguars"
                })
                .expect("Content-Type", "application/json; charset=utf-8")
                .expect(200)
                .then(response => {
                    assert.deepEqual(response.body.data.team, {
                        id: 2,
                        name: "Jacksonville Jaguars"
                    });
                    return;
                }).then(() => {
                    return req.get("/teams/2");
                }).then(response => {
                    assert.deepEqual(response.body.data.team, {
                        id: 2,
                        name: "Jacksonville Jaguars"
                    });
                    done();
                }).catch(done);
        });
        it("returns a list of athletes based on team", function(done){
            request(app)
                .get("/teams/2/athletes")
                .expect("Content-Type", "application/json; charset=utf-8")
                .expect(200)
                .then(response => {
                    assert.deepEqual(response.body.data.athletes, [fixtures.athletes[1], fixtures.athletes[3]]);
                    assert.deepEqual(response.body.included.team, fixtures.teams[1]);
                    done();
                }).catch(done);
        });
    });
    describe("athletes route", function(){
        it("returns a list of athletes", function(done){
            request(app)
                .get("/athletes")
                .expect("Content-Type", "application/json; charset=utf-8")
                .expect(200)
                .then(response => {
                    assert.deepEqual(response.body.data.athletes, fixtures.athletes);
                    assert.deepEqual(response.body.included.teams, fixtures.teams);
                    done();
                }).catch(done);
        });
        it("returns an athlete", function(done){
            request(app)
                .get("/athletes/2")
                .expect("Content-Type", "application/json; charset=utf-8")
                .expect(200)
                .then(response => {
                    assert.deepEqual(response.body.data.athlete, fixtures.athletes[1]);
                    assert.deepEqual(response.body.included.team, fixtures.teams[1]);
                    done();
                }).catch(done);
        });
        it("creates new athletes", function(done){
            request(app)
                .post("/athletes")
                .send({
                    name: "Trevor Siemian",
                    number: "13",
                    teamId: 2
                })
                .expect("Content-Type", "application/json; charset=utf-8")
                .expect(201)
                .then(response => {
                    assert.deepEqual(response.body.data.athlete, {
                        id: 9,
                        name: "Trevor Siemian",
                        number: "13",
                        teamId: 2
                    });
                    assert.deepEqual(response.body.included.team, {
                        id: 2,
                        name: "Denver Broncos"
                    });
                    done();
                }).catch(done);
        });
        it("deletes an athlete", function(done){
            var req = request(app);
            req.delete("/athletes/2")
                .expect(204)
                .then(() => {
                    return req.get("/athletes/2").expect(404);
                }).then(response => {
                    done();
                }).catch(done);
        });
        it("updates an athlete", function(done){
            var req = request(app);
            req.put("/athletes/2")
                .send({
                    name: "Trevor Siemian",
                    number: "13",
                    teamId: 2
                })
                .expect("Content-Type", "application/json; charset=utf-8")
                .expect(200)
                .then(response => {
                    assert.deepEqual(response.body.data.athlete, {
                        id: 2,
                        name: "Trevor Siemian",
                        number: "13",
                        teamId: 2
                    });
                    assert.deepEqual(response.body.included.team, fixtures.teams[1]);
                    return;
                }).then(() => {
                    return req.get("/athletes/2");
                }).then(response => {
                    assert.deepEqual(response.body.data.athlete, {
                        id: 2,
                        name: "Trevor Siemian",
                        number: "13",
                        teamId: 2
                    });
                    assert.deepEqual(response.body.included.team, fixtures.teams[1]);
                    done();
                }).catch(done);
        });
        it("patches an athlete", function(done){
            var req = request(app);
            req.patch("/athletes/2")
                .send({
                    name: "Trevor Siemian"
                })
                .expect("Content-Type", "application/json; charset=utf-8")
                .expect(200)
                .then(response => {
                    assert.deepEqual(response.body.data.athlete, {
                        id: 2,
                        name: "Trevor Siemian",
                        number: "58",
                        teamId: 2
                    });
                    assert.deepEqual(response.body.included.team, fixtures.teams[1]);
                    return;
                }).then(() => {
                    return req.get("/athletes/2");
                }).then(response => {
                    assert.deepEqual(response.body.data.athlete, {
                        id: 2,
                        name: "Trevor Siemian",
                        number: "58",
                        teamId: 2
                    });
                    assert.deepEqual(response.body.included.team, fixtures.teams[1]);
                    done();
                }).catch(done);
        });
    });
});
