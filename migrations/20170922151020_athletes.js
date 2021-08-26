exports.up = function(knex, Promise) {
    return knex.schema.createTable("athlete", team => {
        team.increments();
        team.string("name");
        team.string("number");
        team.integer("teamId").references("id").inTable("team").onDelete("CASCADE");
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists("athlete");
};
