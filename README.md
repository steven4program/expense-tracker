# Todo-List

User can build an Expense Tracker web app.

## Features - 產品功能

- Must register a user to use this app
- Render user's own records.
- See the total amount of expenses on the home page
- Add a expense
- Edit one expense at a time
- Delete one expense at a time
- Filter expenses by category and show the total amount

## Screenshot 畫面瀏覽

Login Page
![image](https://github.com/steven4program/expense-tracker/blob/master/screenshot/Login.png?raw=true)

Register Page
![image](https://github.com/steven4program/expense-tracker/blob/master/screenshot/Register.png?raw=true)

Home Page
![image](https://github.com/steven4program/expense-tracker/blob/master/screenshot/Home.png?raw=true)

Filter Page
![image](https://github.com/steven4program/expense-tracker/blob/master/screenshot/filter.png?raw=true)

Edit Page
![image](https://github.com/steven4program/expense-tracker/blob/master/screenshot/edit.png?raw=true)

Create Page
![image](https://github.com/steven4program/expense-tracker/blob/master/screenshot/create.png?raw=true)

## Prerequisites - 環境建置與需求

- Node.js v10.15.0
- express v4.17.1
- express-handlebars v5.3.2
- method-override v3.0.0
- mongoose v5.13.2
- body-parser v1.19.0
- handlebars-helpers v0.10.0
- express-session v1.17.2
- bcryptjs v2.4.3
- passport v0.5.0
- passport-facebook v3.0.0
- passport-local v1.0.0
- dotenv v10.0.0
- connect-flash v0.1.1

## Installing - 安裝流程

1. 開啟終端機(Terminal)將此專案 Clone 至本機電腦

```
git clone https://github.com/steven4program/expense-tracker.git
```

2. 進入存放此專案的資料夾

```
cd expense-tracker
```

3. 安裝 npm 套件

```
npm install
```

4. 加入種子資料

```
npm run seed
```

5. 啟動網頁伺服器

```
npm run dev
```

當 Terminal 出現以下文字表示成功連結本地伺服器

```
App is running on http://localhost:3000
```

6. 在任一瀏覽器中輸入 http://localhost:3000 開始使用本專案

## Installing - 安裝流程

## 種子資料

- User
  Name: root
  Email: root@example.com
  Password: 12345678

## Developer - 開發者

[Steven Chang](https://github.com/steven4program)
