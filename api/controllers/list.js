import {db} from '../db.js'
import {authenticateToken} from './users.js'

// export const viewPost = (req, res) => {
//   let q = "SELECT * FROM course";
//   const params = [];
  
//   if(req.query.course_id || req.query.course_system_name !== '') {
//     q += " WHERE";
    
//     if(req.query.course_id) {
//       q += " course_id = ?";
//       params.push(req.query.course_id);
//     }
    
//     if(req.query.course_system_name !== '') {
//       if(params.length > 0) q += " AND";
//       q += " course_system_name = ?";
//       params.push(req.query.course_system_name);
//     }
//   }

//   db.query(q, params, (err, data) => {
//     if(err) {
//       return res.json(err);
//     }
//     res.json(data);
//   });
// };
export const viewPost = [authenticateToken, (req, res) => {
  let q = "SELECT * FROM course";
  const params = [];
  
  if(req.query.course_id || req.query.course_system_name !== '') {
    q += " WHERE";
    
    if(req.query.course_id) {
      q += " course_id = ?";
      params.push(req.query.course_id);
    }
    
    if(req.query.course_system_name !== '') {
      if(params.length > 0) q += " AND";
      q += " course_system_name = ?";
      params.push(req.query.course_system_name);
    }
  }

  db.query(q, params, (err, data) => {
    if(err) {
      return res.json(err);
    }
    res.json(data);
  });
}];

export const addPost = (req,res) => {
  const { course_id, course_name, course_system_name, course_type_name, grade_name, subject_name, semester_name } = req.body;

  // 检查是否提供了所有必要字段
  if (!course_id || !course_name || !course_system_name || !course_type_name || !grade_name || !subject_name || !semester_name) {
    return res.status(400).json({ error: "缺少必要字段！" });
  }

  let q = 
  `
    INSERT INTO course (
      course_id,
      course_name, 
      course_system_name, 
      course_type_name, 
      grade_name, 
      subject_name, 
      semester_name
    ) VALUES (?, ?, ?, ?, ?, ?, ?)
  `;
  
  const params = [course_id, course_name, course_system_name, course_type_name, grade_name, subject_name, semester_name];

  db.query(q, params, (err, data) => {
    if (err) {
      return res.json(err);
    }
    res.json({ message: "success", data });
  });
}

export const editPost = (req,res) => {
  const { course_id, course_name, course_system_name, course_type_name, grade_name, subject_name, semester_name } = req.body;

  // 检查是否提供了课程ID
  if (!course_id) {
    return res.status(400).json({ error: "本条数据有问题！" });
  }

  let q = 
  `
    UPDATE course 
    SET 
      course_name = ?, 
      course_system_name = ?, 
      course_type_name = ?, 
      grade_name = ?, 
      subject_name = ?,
      semester_name = ?
    WHERE 
      course_id = ?
  `;
  
  const params = [course_name, course_system_name, course_type_name, grade_name, subject_name, semester_name, course_id];

  db.query(q, params, (err, data) => {
    if (err) {
      return res.json(err);
    }
    res.json({ message: "success", data });
  });
}
export const deletePost = (req,res) => {
  const { course_id } = req.body;

  // 检查是否提供了必要字段
  if (!course_id) {
    return res.status(400).json({ error: "缺少必要字段：course_id" });
  }

  let q = `
    DELETE FROM course 
    WHERE course_id = ?
  `;
  
  db.query(q, [course_id], (err, data) => {
    if (err) {
      return res.json(err);
    }
    if (data.affectedRows === 0) {
      return res.status(404).json({ message: "未找到对应的课程" });
    }
    res.json({ message: "课程删除成功", data });
  });
}