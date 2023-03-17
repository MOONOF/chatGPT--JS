// 对所有收到的消息、事件进⾏统⼀处理
//处理接收普通消息、接收事件推送
const fetch = require('node-fetch');
const axios = require('axios')
module.exports = async (msg) => {
    let that = this
    //接收⼈和发送⼈需要互换⾓⾊
    let options = {
        ToUserName: msg.FromUserName,
        FromUserName: msg.ToUserName,
        CreateTime: Date.now(),
        MsgType: msg.MsgType
    }
    let content = ``;
    //普通消息


    if (msg.MsgType == 'text') {
        // if (msg.Content == '1') {//全匹配
        //     content = `测试使⽤数据1`;
        // } else if (msg.Content.match('2')) {//半匹配
        //     content = `测试使⽤数据2`;
        // }
        try {
            await axios.post('https://api.openai.com/v1/completions', {
                prompt: msg.Content, max_tokens: 2048, model: "text-davinci-003"
            }, {
                headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer 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' }
            }).then(response => {
                console.log(response.data.choices[0]);
                let string = ''
                let str = response.data.choices[0].text
                string = str.replace(/\r|\n/ig, "")
                console.log(string);
                content = string
            })

        } catch (error) {
            // Consider implementing your own error handling logic here
            console.error(error);
            content = `Sorry,出现了一点小故障,请联系管理员`
        }


    } else if (msg.MsgType == 'image' || msg.MsgType == 'voice') {
        options.MediaId = msg.MediaId;
    } else if (msg.MsgType == 'video') {
        options.MediaId = msg.MediaId;
    } else if (msg.MsgType == 'shortvideo') {
        options.MediaId = msg.MediaId;
    } else if (msg.MsgType == 'location') {
        options.MediaId = msg.MediaId;
    } else if (msg.MsgType === 'event') {
        if (msg.Event === 'subscribe') {
            content = `终于等到你，还好我没放弃`;
        }
    }
    //事件推送
    options.MediaId = "";
    options.content = content;
    return options;
}

// try {
//     await axios.post('https://api.openai.com/v1/chat/completions', {
//         // max_tokens: 2048,
//         model: "gpt-3.5-turbo",
//         messages: [{ role: "user", content: "what is the OpenAI missin?" }]
//     }, {
//         headers: { 'content-type': 'application/json', 'Authorization': 'Bearer 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' }
//     }).then(response => {
//         console.log(response, response.data.choices[0]);

//         // let string = ''
//         // let str = response.data.choices[0].text
//         // string = str.replace(/\r|\n/ig, "")
//         // console.log(string);
//         // content = string
//     })