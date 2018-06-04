const mongoose = require('mongoose')
// 链接mongoose
mongoose.connect('mongodb://localhost/todoApp')

let Schema = mongoose.Schema;

let msgSchema = new Schema({
    item:{
        type: String,
        required: true 
    },
    iscomplete:{
        type: Boolean,
        required : true
    }
  });

const Msg = mongoose.model('Msg', msgSchema);





//  const myMsg = new Msg();

module.exports = function (app){
    // 获取数据
    app.get('/',(req, res, next)=>{
        Msg.find((err,data)=>{
             res.render('todo',{
                msgData : data
            })
        })
       
    })

    .put('/completed/:item',(req, res, data)=>{
        let fd = Msg.findOne({item:req.params.item})
          .then(res=>{
              console.log(res)
              if(res){
                  let iscomplete = !res.iscomplete
                  return Msg.update({item:req.params.item},{iscomplete:iscomplete})
              }
          }).then(data=>{
            res.json({status:0})
          })
    })
    // 传递数据
    .post('/todo',(req, res, next)=>{
        if(req.body.item){
            const myMsg = new Msg({ item: req.body.item ,iscomplete:false });
            myMsg.save().then(() =>{
                console.log('添加成功')
                res.json({status:0})
            });
        }
       
    })
    
    .delete('/todo/:item',(req, res, next)=>{
        Msg.remove({item:req.params.item},(err, data)=>{
            // console.log(req.params.item)
            res.json({status:0})
        })
    })
  
}