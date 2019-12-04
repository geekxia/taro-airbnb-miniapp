import Taro from '@tarojs/taro'
import './style.scss'

export default class Header extends Taro.Component {
  constructor(props) {
    super(props)
  }
  render() {
    // title表示导航上的文字
    let { title } = this.props

    console.log(title, this.props)
    return (
      <View className='header'>
        <Text>{title}</Text>
      </View>
    )
  }
}
