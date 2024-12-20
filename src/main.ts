import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import { 
  Button,
  Row,
  Col,
  Form,
  Field,
  CellGroup,
  NavBar,
  Grid,
  GridItem,
  showToast,
  Search,
  List,
  Cell,
  Tag,
  PullRefresh,
  Icon,
  Dialog,
  DropdownMenu,
  DropdownItem,
  Popup,
  Picker
} from 'vant'
import 'vant/lib/index.css'

const app = createApp(App)

// 注册 Vant 组件
app.use(Button)
   .use(Row)
   .use(Col)
   .use(Form)
   .use(Field)
   .use(CellGroup)
   .use(NavBar)
   .use(Grid)
   .use(GridItem)
   .use(Search)
   .use(List)
   .use(Cell)
   .use(Tag)
   .use(PullRefresh)
   .use(Icon)
   .use(Dialog)
   .use(DropdownMenu)
   .use(DropdownItem)
   .use(Popup)
   .use(Picker)
app.use(router)
app.use(createPinia())

app.mount('#app') 