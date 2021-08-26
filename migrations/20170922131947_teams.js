exports.up = function(knex, Promise) {
    return knex.schema.createTable("team", team => {
        team.increments();
        team.string("name");
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists("team");
};
