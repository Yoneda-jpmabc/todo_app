//expressモジュールを使えるように設定
const express = require('express');

//mysqlを使えるように設定
const mysql = require('mysql');

//expressモジュールを利用しアプリケーションオブジェクトappを作成
const app = express();

//サーバー起動後に、リクエストを8888番ポートで待ち受ける設定。
app.listen(8888, () => console.log('App listening on port 8888!'))

//publicフォルダ内のファイルを読み込めるようにする。
app.use(express.static('public'));
//フォームの値を受け取る設定
app.use(express.urlencoded({extended:false}));

//テンプレートエンジンの指定
app.set('view engine', 'ejs');

//mysqlへの接続情報を定数connectionに代入
const connection = mysql.createConnection({
    multipleStatements: true, //複数クエリの記述を可能にする
    host: 'localhost',
    user: 'root',
    password: 'K07141209',
    database: 'tdl_hab'
});

// HTTPgetメソッドでアクセス
app.get('/', (req, res) => {
    //const getTdl = "";
    connection.query(
        'SELECT * FROM tdl;',
        (error, results) => {
            res.render('index.ejs', {items: results});
        }
    );
});

//タスクの追加
app.post('/add', (req, res) => {
    connection.query('INSERT INTO tdl (name) VALUES(?)',
        [req.body.task],
        (error, results) => {
            if (error) console.log(error);
            res.redirect('/');
        }   
    );
});
//タスクの削除
app.post('/delete/:id', (req, res) => {
    connection.query('DELETE FROM tdl WHERE id = ?',
        [req.params.id],
        (error, results) => {
            res.redirect('/');
        }
    );
});