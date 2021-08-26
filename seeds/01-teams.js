exports.seed = function(knex, Promise) {
    return knex("team").del()
        .then(function () {
            return knex("team").insert([{
                name: "Pittsburgh Steelers"
            },{
                name: "Denver Broncos"
            },{
                name: "Buffalo Bills"
            },{
                name: "Oakland Raiders"
            }]);
        });
};
