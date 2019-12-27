import App from '../App.vue'
const LoginIn = () => import('@/views/Mine/login')
const Register = () => import('@/views/Mine/register')

const City = () => import('@/views/City/getCity')
const Home = () => import('@/views/Home/home')
const List = () => import('@/views/List/list')
const Mine = () => import('@/views/Mine/mine')
const ShipAddress = () => import('@/views/Address/shipping')
const FoodTypeItem = () => import('@/views/Food/foodType')
const SelectCity = () => import('@/views/Address/selectCity')
const SearchCity = () => import('@/views/Address/searchCity')
const MyShipAddress = () => import('@/views/Address/myShipAddress.vue')
const AddShipAddress = () => import('@/views/Address/addShipAddress.vue')
const ModifyShipAddress = () => import('@/views/Address/modifyShipAddress.vue')

export default [{
  path: '/',
  component: App,
  children: [{
      path: '',
      redirect: '/home'
    }, {
      path: '/city',
      name: 'city',
      component: City
    }, {
      path: '/home',
      name: 'home',
      component: Home
    }, {
      path: '/list',
      name: 'list',
      component: List
    }, {
      path: '/mine',
      name: 'mine',
      component: Mine
    }, {
      path: '/shipping_address',
      name: 'shipping_address',
      component: ShipAddress,
      meta: {
        title: "选择收货地址", //配置title
        auth: true //是否登陆验证
      }
    }, {
      path: '/food_type_item',
      name: 'food_type_item',
      component: FoodTypeItem,

    }, {
      path: '/select_city',
      component: SelectCity,
      meta: {
        title: "选择城市"
      }
    }, {
      path: '/search_city/:currentCityId',
      component: SearchCity,
      meta: {
        title: "搜索城市"
      }
    }, {
      path: '/my_ship_address',
      component: MyShipAddress,
      meta: {
        title: "我的收货地址",
        auth: true
      }
    }, {
      path: '/add_ship_address',
      component: AddShipAddress,
      meta: {
        title: "新增地址",
        auth: true,
        keepAlive: true
      }
    }, {
      path: '/modify_ship_address',
      component: ModifyShipAddress,
      meta: {
        title: "修改地址",
        auth: true
      }
    }, {
      path: '/login',
      name: 'login',
      component: LoginIn,
      meta: {
        title: "登陆",
      }
    },
    {
      path: '/register',
      name: 'register',
      component: Register,
      meta: {
        title: "注册",
        keepAlive: true
      }
    }
  ]
}]