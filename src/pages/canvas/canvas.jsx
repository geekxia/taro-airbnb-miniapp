import Taro from '@tarojs/taro'
import './style.scss'
import { ticketPng } from '@/assets'

export default class CanvasPage extends Taro.Component {
  constructor(props) {
    super(props)
    this.state = {
      src: ''
    }
  }

  // 把rpx单位转化为支持canvas的px单位
  rpx2px(rpx) {
    const info = Taro.getSystemInfoSync()
    return rpx * info.windowWidth / 750
  }

  save() {
    // 1-把画布转化成临时文件
      Taro.canvasToTempFilePath({
        x: 0,
        y: 0,
        width: this.rpx2px(750),    // 画布的宽
        height: this.rpx2px(1000),   // 画布的高
        destWidth: 1500,
        destHeight: 2000,
        canvasId: 'canvas',
        success(res) {
          // 2-保存图片至相册
          Taro.saveImageToPhotosAlbum({
            filePath: res.tempFilePath,
            success(res2) {
              Taro.showToast({title: '保存至相册成功'})
            }
          })
        }
      })
  }

  componentDidMount() {
    // 创建画布上下文对象
    const ctx = Taro.createCanvasContext('canvas')

    // 填充背景色
    ctx.setFillStyle('#FF7A04')
    ctx.fillRect(0,0, this.rpx2px(750), this.rpx2px(1000))

    // 绘制礼券的标题
    ctx.setFontSize(this.rpx2px(52))
    ctx.setFillStyle('#FDFDFD')
    ctx.setTextAlign('center')
    ctx.fillText('1000元礼品券', this.rpx2px(375), this.rpx2px(90), this.rpx2px(750))

    // 绘制图片
    ctx.drawImage(ticketPng, this.rpx2px(50), this.rpx2px(142), this.rpx2px(650), this.rpx2px(200))

    // 绘制说明文字
    const arr = ['使用说明：', '1.请保存图片，凭图片唯一礼券码尽快联系市场', '经理进行兑奖；', '2.补品券以手机绑定的客户编码为准，一张礼品', '券在有效期内只能使用一次，不可叠加使用；', '3.礼品券不能兑换现金、不找零、不能转赠他人、', '不能为他人代付款，抵扣金额不能开具发票；', '4.2019年9月07日12:00之前使用有效。']
    ctx.setFontSize(this.rpx2px(26))
    ctx.setFillStyle('#FFFFFF')
    ctx.setTextAlign('left')
    for (let i=0; i<arr.length; i++) {
      ctx.fillText(arr[i], this.rpx2px(80), this.rpx2px(390 + 40 * i), this.rpx2px(650))
    }

    // 绘制
    ctx.draw()
  }


  render() {

    return(
      <View className="page_canvas">
        <Canvas
        className='canvas'
        canvas-id="canvas"></Canvas>
        <Button onTap={this.save.bind(this)}>保存至相册</Button>
      </View>
    )
  }
}
