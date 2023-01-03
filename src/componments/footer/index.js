import React, { memo } from 'react'
import { Box, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import i18next from "i18next";
import agoraLogo from '../../assets/images/agoralogo.png'
import subtractIcon from '../../assets/images/subtract.png'
import huanxinIcon from '../../assets/images/huanxin2.png'
import gongan from '../../assets/images/gongan.png'
const useStyles = makeStyles((theme) => {
    return {
        root: {
            height: "25%",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-around",
            background: "#393939"
        },
        copyrightStyle: {
            fontFamily: "Roboto",
            fontSize: "14px",
            fontWeight: "400",
            lineHeight: "14px",
            letterSpacing: "0px",
            textAlign: "left",
            color: "#FFFFFF"
        },
        copyrightBox: {
            marginTop: '16px'
        },
        huanxin: {
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start"
        },
        versionBox: {
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end",
            marginTop: "28px"
        },
        versionStyle: {
            fontFamily: "Roboto",
            fontSize: "14px",
            fontWeight: "500",
            lineHeight: "20px",
            letterSpacing: "0px",
            marginLeft: "10px",
            color: "#a5a5a5"
        },
        linkStyle: {
            fontFamily: "PingFang SC",
            fontSize: "14px",
            fontWeight: "500",
            lineHeight: "14px",
            letterSpacing: "0.33px",
            textAlign: "left",
            color: "#2F80ED",
            marginLeft: "15px",
            cursor: "pointer",
            lineHeight: "28px",
            textDecoration: "none"
        },
        iconBox: {
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
        },
        versionTextStyle: {
            color: "#FFFFFF"
        }
    }
})
const Footer = () => {
    const classes = useStyles();
    return (
        <Box className={classes.root}>
            <div className={classes.huanxin}>
                <a href='https://www.easemob.com/' style={{margin: "8px 8px 0"}}>
                    <img src={huanxinIcon} alt='easemob'></img>
                </a>
                <div>
                    <Typography className={classes.copyrightStyle}>Copyright © 2015-2022 环信 Co.,Ltd. 北京亿思摩博科技有限公司版权所有
                    </Typography>
                    <Typography>
                        <span className={classes.copyrightStyle}>
                            京ICP备14026002号-2 SLA协议 京ICP证160482
                        </span>
                        <img src={gongan} alt='easemob'></img>
                        <span className={classes.copyrightStyle}>
                            京公网安备 11010802031579号
                        </span>
                    </Typography>
                </div>
            </div>
            <Box className={classes.versionBox}>
                <Typography className={classes.copyrightStyle}>
                    SDK 版本：v1.0.0  UI Library 版本：v1.0.0
                </Typography>
                <a href='https://www.easemob.com/download/demo' className={classes.linkStyle}>体验更多Demo</a>
            </Box>
        </Box>
    )
}

export default memo(Footer);