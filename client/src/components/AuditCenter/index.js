import React, {useState, useEffect} from "react";
import {useStyles} from './styles.js'
import avatar from '../../assets/user.jpg';

const UploadRecord = () => {
    const classes = useStyles();

    return (
        <section className={classes.content}>
            <div className={classes.title}>
                <h1>审核中心</h1>
            </div>
            <div className={classes.row}>
                <table className={classes.Record}>
                    <tr>
                        <th>类型</th>
                        <th>NFT名称</th>
                        <th>审核状态</th>
                        <th>审核时间</th>
                    </tr>
                    <tr>
                        <td>图片</td>
                        <td>敦煌飞天</td>
                        <td>通过</td>
                        <td>2022-08-29 10:38:40</td>
                    </tr>
                    <tr>
                        <td>图片</td>
                        <td>敦煌飞天</td>
                        <td>未通过</td>
                        <td>2022-08-29 10:40:40</td>
                    </tr>
                    <tr>
                        <td>图片</td>
                        <td>青花瓷瓶子</td>
                        <td>通过</td>
                        <td>2022-08-30 10:38:40</td>
                    </tr>
                    <tr>
                        <td>图片</td>
                        <td>无聊猿01</td>
                        <td>通过</td>
                        <td>2022-08-31 10:38:40</td>
                    </tr>
                    <tr>
                        <td>图片</td>
                        <td>无聊猿02</td>
                        <td>通过</td>
                        <td>2022-08-31 12:38:40</td>
                    </tr>
                    <tr>
                        <td>图片</td>
                        <td>无聊猿03</td>
                        <td>通过</td>
                        <td>2022-08-31 14:38:40</td>
                    </tr>
                    <tr>
                        <td>图片</td>
                        <td>无聊猿04</td>
                        <td>通过</td>
                        <td>2022-08-31 15:38:40</td>
                    </tr>
                </table>

            </div>
        </section>
    )
};

export default UploadRecord;