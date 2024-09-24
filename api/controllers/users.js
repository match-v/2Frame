import {db} from '../db.js'
import jwt from 'jsonwebtoken'

export const loginCheck = (req,res) => {
  const { user_id, password } = req.body;
  const q = 'SELECT * FROM user WHERE user_id = ? AND password = ?'
  const secretKey = 'jwt_secret_key';
  db.query(q, [user_id,password], (err, data) => {
    if (err) {
      return res.status(500).json({ error: '服务端错误' });
    }

    if (data.length === 0) {
      return res.status(401).json({ error: 'Invalid' });
    }

    const user = data[0];

    const token = jwt.sign({ user_id: user.user_id }, secretKey);

      // 返回token和用户信息
      res.json({
        message: '用户登录成功！！',
        token,
        user: {
          user_id: user.user_id,
          username: user.username
        }
      });
  });
}

export const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.sendStatus(401); // 如果没有提供token，则返回401未授权

  jwt.verify(token, 'jwt_secret_key', (err, user) => {
    if (err) return res.sendStatus(403); // 如果token无效，则返回403禁止访问
    req.user = user; // 将解码后的用户信息附加到请求对象上
    next(); // 调用下一个中间件或路由处理器
  });
};