/*
 * @Descripttion:
 * @version:
 * @Author: maoyueer
 * @Date: 2023-03-17 13:32:31
 * @LastEditors: maoyueer
 * @LastEditTime: 2023-11-09 11:45:34
 */
// 格式化日期 常量
export const FORMATTER = 'YYYY-MM-DD'
export const FORMATTER_TIME = 'YYYY-MM-DD HH:mm:ss'

/***
 * 搜索统一布局
 */
export const SERACH_LAYOUT = {
	labelCol: { span: 6 },
	wrapperCol: { span: 18 }
}

// 状态 - 启用停用
export const STATUS_ENUM = {
	ENABLE: '1',
	DISABLED: '2'
}
export const STATUS_MAP = {
	[STATUS_ENUM.ENABLE]: '启用',
	[STATUS_ENUM.DISABLED]: '停用'
}

export const STATUS_APPLICATION_ENUM = {
	USING: '1',
	UNUSED: '2'
}

export const STATUS_ENUM_APPLICATION_MAP = {
	[STATUS_APPLICATION_ENUM.USING]: '使用中',
	[STATUS_APPLICATION_ENUM.UNUSED]: '未使用'
}

// 资源类型的枚举值
export const AUTH_TYPE_ENUM = {
	MENU: '1',
	OPERATE: '2',
	INNER_PAGE: '3'
}

export const AUTH_TYPE_OPTIONS = [
	{
		value: AUTH_TYPE_ENUM.MENU,
		label: '菜单'
	},
	{
		value: AUTH_TYPE_ENUM.OPERATE,
		label: '操作'
	},
	{
		value: AUTH_TYPE_ENUM.INNER_PAGE,
		label: '内置页面'
	}
]

//文件上传来源  枚举
export const UPLOAD_SOURCE_ENUM = {
	FILES: 'files', // 文件目录
	CODE: 'code', // 算法管理
	MODEL: 'model', // 模型管理
	TRAINING: 'training', // 训练
	IMAGES: 'images', // 镜像
	SZYJ: 'szyj', // szyj
	RESOURCE: 'resource'
}

// 获取文件夹下文件类型、当前要求文件夹下文件类型一致，要么全是文件夹；要么全是文件。
export const FOLDER_TYPE_ENUM = {
	FOLDER: '1', // 文件夹
	FILES: '2', // 文件
	MIXED: '3', // 混合
	EMPTY: '4' // 空
}
// 文件夹：folder；数据集：dataset；算法：code；模型：model
export const BUZ_TYPE_ENUM = {
	FOLDER: 'folder',
	DATASET: 'dataset',
	CODE: 'code',
	MODEL: 'model'
}
// 数据集标签颜色集
export const DATA_SET_TAG_COLOR_MAP: any = {
	1: 'magenta',
	2: 'red',
	3: 'volcano',
	4: 'orange',
	5: 'gold',
	6: 'lime',
	7: 'green',
	8: 'cyan',
	9: 'blue',
	10: 'geekblue',
	11: 'processing',
	12: 'success',
	13: 'magenta',
	14: 'red',
	15: 'orange',
	16: 'gold',
	17: 'lime',
	18: 'green',
	19: 'cyan',
	20: 'blue',
	21: 'geekblue',
	22: 'processing',
	23: 'success',
	24: 'magenta'
}

// 数据类型options
export const FILE_DATA_TYPES = [
	{
		label: '图片',
		value: '1'
	},
	{
		label: '视频',
		value: '2'
	},
	{
		label: '文本',
		value: '3'
	}
]

// 保存为数据集
export const SAVE_DATA_SET_MODAL = 'SAVE_DATA_SET_MODAL'
