widgets.errbit_unresolved_exceptions = function(data, $) {
  var rows = "";
  if (data.errbit_unresolved_exceptions.length > 0) {
    $.each(data.errbit_unresolved_exceptions, function(i, exception) {
      rows += '<tr>';
      rows += '<td>' + exception.env + '<br />';
      rows += (exception.url && exception.url !== "{}" ? stringToUrl(exception.url).pathname : 'n/a') + '</td>';
      rows += '<td>' + exception.count + '</td>';
      rows += '<td>' + (humaneDate(exception.last_occurrence) || exception.last_occurrence) + '</td>';
      rows += '</tr>';
    });
  } else if (data.error) {
    rows += '<tr><td colspan=4><div class="alert alert-error" title="' + data.error + '">There was a problem retrieving errors</div></td></tr>'
  } else {
    rows += '<tr><td colspan=4><div class="alert alert-success">No unresolved errors <i class="icon-thumbs-up"></i></div></td></tr>';
  }
  $('#errbit tbody').html(rows);
  $('#errbit-title .badge')
    .html(data.errbit_unresolved_exceptions.length)
    .removeClass('badge-success').removeClass('badge-warning')
    .addClass(data.errbit_unresolved_exceptions.length === 0 ? 'badge-success' : 'badge-warning');
  $('.refresh-service[data-service="errbit_unresolved_exceptions"]').removeClass('disabled').html('<i class="icon-retweet"></i>').siblings('.refresh-ok').show().delay('250').fadeOut();
};
