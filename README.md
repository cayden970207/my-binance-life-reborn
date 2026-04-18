# 转生之我的币安人生 (My Binance Life · Reborn)

扮演 CZ,重开你的币圈一生。有人上岸,有人坐牢,有人去卖拉面。

基于 [VickScarlet/lifeRestart](https://github.com/VickScarlet/lifeRestart) 重构,融入《币安人生》全书内容 + 2025-2026 最新币圈事件 + 12 个关键人生抉择。

## 玩法

- 每次重开都是新的 CZ 人生
- 随机天赋 + 自由分配属性
- 人生中 12 个关键抉择点(18岁选专业 / 35岁BTC入圈 / 42岁SBF拜访 / 46岁司法部通牒...)
- 2364 个事件,80 个结局
- 死亡后可生成分享卡,发到推特/复制文字

## 本地开发

需要 Node.js v20.19+ 或 v22.12+。

```bash
npm install
npm run dev
```

重新生成游戏数据(天赋/事件/成就):

```bash
node data-gen/generate.mjs
```

## 构建

```bash
npm run build
```

输出到 `dist/` 目录。

## 数据结构

- `data-gen/` - 内容生成器(JS 脚本输出 JSON)
- `public/data/zh-cn/` - 游戏运行时读的 JSON
- `src/modules/` - 游戏核心(事件/天赋/属性/人生)
- `src/ui/` - UI 层(Laya)
- `src/ui/share-card.js` - 分享卡片
- `src/ui/choice-modal.js` - 抉择弹窗

## License

MIT · 基于原项目 MIT License
