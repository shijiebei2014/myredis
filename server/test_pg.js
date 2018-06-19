var _ = require('lodash')
var PGClient = require('pg').Client

var pGClient = new PGClient({
  host: '47.98.63.167',
  port: 54320,
  user: 'postgres',
  password: 'readonly',
  database: 'postgres'
})

pGClient.connect()

pGClient.query('select id, str_emp, str_url, d_cr from data.ds25 where str_url = $1 and str_method = $2 and code_grup = $3 order by d_cr desc', ['/admin/wf/process_visual_define/customize_bb/batch/delete', 'POST', '1086'], function(err, res) {
  if (err) {
    return done(err)
  }
  console.log(JSON.stringify(_.chain(res.rows).map(function(r) {
    return r.id
  }).value()))
})
