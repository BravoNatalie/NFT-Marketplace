import React, {useState, useEffect} from "react";
import {useStyles} from './styles.js'

const TransactionRecord = () => {
    const classes = useStyles();

    return (
        <section className={classes.content}>
            <div className={classes.title}>
                <h1>交易记录</h1>
            </div>
            <div className={classes.row}>
                <table className={classes.Record}>
                    <tr>
                        <th>交易类型</th>
                        <th>NFT名称</th>
                        <th>价格/积分</th>
                        <th>交易时间</th>
                    </tr>
                    <tr>
                        <td>购买</td>
                        <td>敦煌飞天</td>
                        <td>99积分</td>
                        <td>2022-08-29 10:38:40</td>
                    </tr>
                    <tr>
                        <td>赠予</td>
                        <td>敦煌飞天</td>
                        <td>0</td>
                        <td>2022-08-29 10:40:40</td>
                    </tr>
                    <tr>
                        <td>购买</td>
                        <td>青花瓷瓶子</td>
                        <td>999RMB</td>
                        <td>2022-08-30 10:38:40</td>
                    </tr>
                    <tr>
                        <td>售卖</td>
                        <td>无聊猿01</td>
                        <td>99积分</td>
                        <td>2022-08-31 10:38:40</td>
                    </tr>
                    <tr>
                        <td>购买</td>
                        <td>无聊猿02</td>
                        <td>88积分</td>
                        <td>2022-08-31 12:38:40</td>
                    </tr>
                    <tr>
                        <td>赠予</td>
                        <td>无聊猿03</td>
                        <td>0</td>
                        <td>2022-08-31 14:38:40</td>
                    </tr>
                    <tr>
                        <td>购买</td>
                        <td>无聊猿04</td>
                        <td>88RMB</td>
                        <td>2022-08-31 15:38:40</td>
                    </tr>
                </table>

            </div>
        </section>
    )
};

export default TransactionRecord;