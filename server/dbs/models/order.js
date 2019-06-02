import mongoose from 'mongoose'
const Schema = mongoose.Schema
const Order = new Schema({
  id: {
    type: String,
    require: true
  },
  count: {
    type: Number,
    require: true
  },
  // 用户
  user:{
    type:String,
    require:true
  },
  // 创建时间
  time:{
    type:String,
    require:true
  },
  // 支付金额
  total:{
    type:Number,
    require:true
  },
  // 订单对应图片
  imgs:{
    type:Array,
    require:true
  },
  // 项目名称
  name:{
    type:String,
    require:true
  },
  // 待付款，待使用等状态
  status:{
    type:Number,
    require:true
  }
})

export default mongoose.model('Order', Order)
