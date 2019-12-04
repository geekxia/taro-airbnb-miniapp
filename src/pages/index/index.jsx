import Taro from '@tarojs/taro'
import { View, Button, Text } from '@tarojs/components'
import { observer, inject } from '@tarojs/mobx'

import './index.scss'
import { Header } from '@/components'
import { swiperArr } from '@/assets'


@inject('counterStore')
@observer
class Index extends Taro.Component {
  config = {

  }

  render () {
    const { counterStore: { counter } } = this.props
    return (
      <View className='page page_index'>
        <Header title='Airbnb爱彼迎民宿预订'></Header>

        <Swiper
          className='pi_swiper'
          indicatorColor='#999'
          indicatorActiveColor='#333'
          indicatorDots
          autoplay>
          {
            swiperArr.map((ele,idx)=>{
              return(
                <SwiperItem key={ele.id}>
                  <View className='pi_swiper_item'>
                    <Image src={ele.img} />
                    <View className='pi_swiper_info'>
                      <Text>{ele.label}</Text>
                      <Text>{ele.desc}</Text>
                    </View>
                  </View>
                </SwiperItem>
              )
            })
          }
        </Swiper>
      </View>
    )
  }
}

export default Index
