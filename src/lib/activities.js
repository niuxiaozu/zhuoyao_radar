module.exports = {
    //活动Up状态的妖灵
    Data:{
        //人生赢家
        2000506:(
            (new Date()).getMonth() == 4 
            && 
            [29,30].includes((new Date()).getDate())
        ),
        2000507:(
            (new Date()).getMonth() == 5 
            && 
            [2,3].includes((new Date()).getDate())
        ),
        2000508:(
            ((new Date()).getMonth() == 4 && (new Date()).getDate()== 31)
            ||
            ((new Date()).getMonth() == 5 && (new Date()).getDate()== 1)
        ), 
        2000509:(
            (new Date()).getMonth() == 5 
            && 
            [4,5].includes((new Date()).getDate())
        ),   
        
        //三魂七魄
        2000272:true,
        2000271:true,
    }
};