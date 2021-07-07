$(function(){
  //厳密な文法チェックを有効にする
  'use strict';

  //追加ボタンを取得
  var $post = $('#post');
  //期限
  var $limit = $('#limit');
  //内容フォーム
  var $task = $('#task');
  //表示部分
  var $view = $('#taskView');
  
  //タスク入力の内容をタスク一覧に追加する
  $post.on('click',function(e){
    // フォームのデフォルトの動作を止める
    e.preventDefault();
    //期限を取得 #limit　テキストボックスに入っている期限を取得
    var limitDate = $limit.val();// .val();
    //タスク内容を取得 #task　テキストボックスに入っている文字列を取得
    var task = $task.val();
    //タスクアイテム生成・追加(期限、タスク内容を表示させる)
    addTaskData(limitDate, task);
    //追加後にnyuu入力内容（テキストボックス）を空にする
    var $input = $('input');
    $input.val('');

    var items = [];
    var $taskItems  = $view.find('.task-item');
      // console.log($taskItems);
    $taskItems.each(function(index, element){
      var item = createDataStructure(index, element);
      items.push(item);
      // console.log(item);
    });
    var saveData = JSON.stringify(items);
    localStorage.setItem('data', saveData);
    // console.log(localStorage.getItem('data'));
  });

  /*
  function 関数名(引数1,引数2,・・){
    実行したい処理;
          ・・・
    return 戻り値;
  }
  */

  function readData(){
    var savedData = localStorage.getItem('data');
    if (!savedData){
      savedData = '';
    }
    var items = JSON.parse(savedData);
    for (var i = 0; i < items.length; i++){
      var item = items[i];
      addTaskData(item.limitDate, item.task);
    }
  }

  function createDataStructure(index,element){
      var $element = $(element);

      var $limitDateElem = $element.find('time');
      var $taskElem = $element.find('span');
      //「attr」とは「attribute(属性)」の略称で、要素の属性を取得するための関数
      // = $要素.attr("属性");
      var limitDate = $limitDateElem.attr('data-value'); // .attr('属性名', '属性値') 属性を追加・更新。属性名を指定すると、属性値を取得できる
      var task = $taskElem.attr('data-value'); // .attr('属性名', '属性値') 属性を追加・更新。属性名を指定すると、属性値を取得できる

      var item = {};
      item.limitDate = limitDate;
      item.task = task;
      return item; // return 戻り値
  }

//JSON.stringify
//JSON.parse

function addTaskData(limitDate, task){

    var $taskItem = $('<li/>');
    $taskItem.addClass('task-item row'); // クラスを付加
    // 完了ボタンの生成
    var $complete = $('<button type="button">完了</button>');
    $complete.addClass('btn btn-primary btn-xs'); // クラスを付加
    //日付表示用要素の生成
    var $limitDateElem = $('<time/>');
    $limitDateElem.addClass('col-sm-3');// クラスを付加
    //期限の値を$limitDateElemに与える
    $limitDateElem.attr('data-value', limitDate);// .attr('属性名', '属性値') 属性を追加・更新
    $limitDateElem.text(limitDate);// .text(); 要素内のテキストの内容を設定/取得
    //内容表示用要素の生成
    var $taskElem = $('<span/>');
    $taskElem.addClass('col-sm-8');// クラスを付加
    //内容の値を$taskElemに与える
    $taskElem.attr('data-value', task);// .attr('属性名', '属性値') 属性を追加・更新
    $taskElem.text(task);// .text(); 要素内のテキストの内容を設定/取得

    //$complete、$limitDateElem、$taskElem　を$taskItemに追加　＊メソッドチェイン
    //ー .append();　DOMもしくはjQueryオブジェクトを引数に取り、自身の子要素に追加する
    $taskItem.append($complete).append($limitDateElem).append($taskElem);

    //完了ボタンをクリックした時の処理
    //ー .remove(); 選択中の要素を削除する
    $complete.click(function(){
        $taskItem.remove();
    });

    //$taskItemを＄taskViewに追加
    //ー .append();　DOMもしくはjQueryオブジェクトを引数に取り、自身の子要素に追加する
    $('#taskView').append($taskItem);
  }

//  $()
//  document.createElement('div');
// document.createElement('li');
});
