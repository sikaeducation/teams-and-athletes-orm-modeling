exports.seed = function(knex, Promise) {
    return knex("athlete").del()
        .then(function () {
            return knex("athlete").insert([{
                name: "Antonio Brown",
                number: "84",
                teamId: 1
            },{
                name: "Von Miller",
                number: "58",
                teamId: 2
            },{
                name: "Martavis Bryant",
                number: "10",
                teamId: 1
            },{
                name: "Aqib Talib",
                number: "21",
                teamId: 2
            },{
                name: "Tyrod Taylor",
                number: "5",
                teamId: 3
            },{
                name: "Derek Carr",
                number: "4",
                teamId: 4
            },{
                name: "LeSean McCoy",
                number: "25",
                teamId: 3
            },{
                name: "Marshawn Lynch",
                number: "24",
                teamId: 4
            }]);
        });
};
