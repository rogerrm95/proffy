import Knex from 'knex';

export async function up(knex: Knex) {
    return knex.schema.table('users', table => {
        table.string('passwordResetToken')
        table.date('passwordResetExpires')
    })
}

export async function down(knex: Knex) {
    return knex.schema.table('connections', table =>{
        table.dropColumn('passwordResetToken')
        table.dropColumn('passwordResetExpires')
    })
}