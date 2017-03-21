import Router from "koa-router";
import {
    addHotSwitch,
    getHotSwitch,
    deleteHotSwitch
} from "../controller/testController";

const router = Router({
    prefix: '/web/v1/demo'
})

router.post('/addHotSwitch', addHotSwitch)// 接收notify工单完工通知
router.get('/getHotSwitch/:key/:enable', getHotSwitch)// 获取企业下所有工单及对应的最后一道工序
router.delete('/deleteHotSwitch/:id', deleteHotSwitch)// 删除热开关

router.get("/", async(ctx) => {
   ctx.body = 123
});
export default router
