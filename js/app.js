$(function () {
  function getTask() {
    var _apiKey = "8o41hQNpTkXiEwl9BN6aXtnCqQnHQoc2qZTbDZWHnO4o1bfy9a5ljl6CFPTOO0wm";
    var _baseUrl = "https://bfp.backlog.jp";
    var _apiUrl = "/api/v2/users/1073919059/activities";
    var query = {
      activityTypeId_update: 2, //課題を更新
      activityTypeId_coment: 3, //課題にコメント
			count: 100,
			maxId : "334474197" //このIDより古いデータを取得
    };

    // var _url = _baseUrl + _apiUrl + '?apiKey=' + _apiKey + '&activityTypeId[]=' + query.activityTypeId + '&count=' + query.count;
    var _url = _baseUrl + _apiUrl + "?apiKey=" + _apiKey + "&activityTypeId[]=" + query.activityTypeId_update + "&activityTypeId[]=" + query.activityTypeId_coment + "&count=" + query.count + "&maxId="+query.maxId;
    // console.log(_url)

    $.getJSON(_url)
			.done(function (res) {
				console.log(res);
        $(".btn").on("click", function (e) {
          $(".item,.idlist").remove();
          var _mon = $("#selectMonth").val();
          // console.log(_mon);
          main(res, _mon);
        });
      })
      .fail(function () {
        console.log("err");
      });
  }
  getTask();

  function main(_list, selectMonth) {
    // console.log(_list)
    console.log(selectMonth);
    var listLength = _list.length;
// console.log(listLength)
    var _firstId = _list[0].id;
    var _lastId = _list[listLength-1].id;
    console.log(_firstId)
    console.log(_lastId)
    var _idHtml = `
    <div class="idlist">
    <p>最新のID：${_firstId}</p>
    <p class="last">最後のID：${_lastId}</p>
    </div>
    `;
    $(".list").before(_idHtml);

    for (var i = 0; i < listLength; i++) {
      const _displayManth = selectMonth;

      var evenClass = "";
      if (i % 2 !== 0) {
        evenClass = "even";
      }
      console.log(listLength)


      var _item = _list[i];
      var _date = _item.created.substring(0, _item.created.indexOf("T"));
      var date_slice = _date.split("-");
      var _month = date_slice[1];



      var _html = `
      <div class="item ${evenClass}">
        <a href="https://bfp.backlog.jp/view/${_item.project.projectKey}-${_item.content.key_id}" target="_blank">
          <div class="inner">
            <p class="date">${_date}　　　ID:${_item.id}</p>
            <div class="block">
              <p class="p_name">${_item.project.name} ${_item.project.projectKey}</p>
              <p class="title">${_item.content.summary}</p>
            </div>
          </div>
        </a>
      </div>`;

      var _noItenHtml = `	
			<p class="error">その月は取得していないです</p>
			`;

			if (_month == _displayManth) {
				$("#list").append(_html);
			}

    }
  }
});
