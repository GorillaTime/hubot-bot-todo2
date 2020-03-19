// Description:
//   TODO を管理することができるボットです
// Commands:
//   ボット名 todo     - TODO を作成
//   ボット名 done     - TODO を完了にする
//   ボット名 del      - TODO を消す
//   ボット名 list     - TODO の一覧表示
//   ボット名 donelist - 完了した TODO の一覧表示
'use strict';
const todo = require('hubot-bot-todo');
module.exports = (robot) => {
  robot.respond(/todo (.+)/i, (msg) => {
    //.は全ての位置文字にマッチする
    //+は直前の文字の1回以上の繰り返しにマッチする
    // aaa　あいうえお　等もマッチする
    // (.+) 正規表現を()で囲むと、後で取得できる
    // /iは　大文字小文字でもマッチできる
    // つまり「todo 1文字以上の文字列」という文字列にマッチするという意味

    const task = msg.match[1].trim();
    //msgオブジェクトのmatchプロパティを取得
    //msg.matchの0番目にマッチした文字列全体
    //masg.match 1番目にマッチした文字列が入る
    // trim()は前後の空白を削除してくれる

    //console.log("msg.matchの0番目にマッチした文字列全体が入ります :" + msg.match[0]);
    //hubot-bot-todo2> hubot-bot-todo2 todo 買い物
    //hubot-bot-todo2> msg.matchの0番目にマッチした文字列全体が入ります :hubot-bot-todo2 todo 買い物

    //msg.match[0] => 'hubot-bot-todo2 todo 買い物に行く'
    //msg.match[1] => '買い物に行く'

    todo.todo(task);
    msg.send('追加しました: ' + task);
  });
  robot.respond(/done (.+)/i, (msg) => {
    const task = msg.match[1].trim();
    todo.done(task);
    msg.send('完了にしました: ' + task);
  });
  robot.respond(/del (.+)/i, (msg) => {
    const task = msg.match[1].trim();
    todo.del(task);
    msg.send('削除しました: ' + task);
  });  

  robot.respond(/list/i, (msg) => {
    const list = todo.list();
    if(list.length === 0) {
      msg.send('(TODOはありません)');
    }else {
      msg.send(todo.list().join('\n'));
    }
    /**
     * join関数は配列のすべての要素を繋いで一つの文字列にする
     * 
     * ['鉛筆を買う','買い物をする','掃除をする'].join('');
     * "鉛筆を買う買い物をする掃除をする"
     * ['鉛筆を買う','買い物をする','掃除をする'].join(',');
     * "鉛筆を買う,買い物をする,掃除をする"
     * ['鉛筆を買う','買い物をする','掃除をする'].join('\n');
     * "鉛筆を買う
     * 買い物をする
     * 掃除をする" 
     */
  });
  robot.respond(/donelist/i, (msg) => {
    const donelist = todo.donelist();
    if(donelist.length === 0) {
      msg.send('(完了したTODOはありません)');
    }else {
      msg.send(todo.donelist().join('\n'));
    }
  });
  
};