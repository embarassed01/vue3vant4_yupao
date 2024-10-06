package com.example.demo.model;

import java.io.Serializable;
import java.sql.Date;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableLogic;
import com.baomidou.mybatisplus.annotation.TableName;

import lombok.Data;

@TableName(value = "tag")
@Data
public class Tag implements Serializable {
    
    @TableId(type = IdType.AUTO)
    private Long id;

    private String tagName;

    private Long userId;

    private Long parentId;

    private Integer isParent;

    private Date createTime;

    private Date updateTime;

    @TableLogic
    private Integer isDelete;

    @TableField(exist = false)
    private static final long serialVersionUID = 10L;
}
