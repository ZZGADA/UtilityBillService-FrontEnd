import React, { useState, useEffect, useImperativeHandle } from 'react'
import { Form, Row, Col, Button, Space, Input, Checkbox, Select, DatePicker } from 'antd'
import { DownCircleOutlined } from '@ant-design/icons'
// import { SERACH_LAYOUT } from "@/const/constants";
import './index.less'

// 默认展示5个
const SPAN_NUMBER = 5
const ROW_SHOW_NUMBER = 3

export default function SearchForm(props: any) {
	const { formItems, onSearch, wrappedComponentRef, ...rest } = props
	// 此处注意useImperativeHandle方法的的第一个参数是目标元素的ref引用 changeVal 就是暴露给父组件的方法
	useImperativeHandle(wrappedComponentRef, () => ({
		form
	}))

	const [form] = Form.useForm()
	// 展开 收起标示
	const [searchExpand, setSearchExpand] = useState(false)
	// 按钮偏移
	const [btnOffset, setBtnOffset] = useState(0)
	const [btnExpandOffset, setBtnExpandOffset] = useState(0)
	const [showFormItems, setShowFormItems] = useState<any[]>([])
	const [expandFormItems, setExpandFormItems] = useState<any[]>([])

	useEffect(() => {
		getOffset()
		handleFormItems()
	}, [formItems])

	// 根据条件数量渲染，超出五个，根据展开/收起
	const handleFormItems = () => {
		const copyFormItems = [...formItems]
		const expandItems = copyFormItems.splice(SPAN_NUMBER)
		setShowFormItems(copyFormItems)
		setExpandFormItems(expandItems)
	}

	// 查询条件
	const handleSearchQuery = () => {
		const values = form.getFieldsValue()
		let params = {
			...values
		}
		if (searchExpand) {
			onSearch && onSearch(params)
			return
		}
		const expandParams = getExpand()
		Object.keys(expandParams).forEach(v => {
			if (params[v]) {
				params[v] = {
					...expandParams[v],
					...params[v]
				}
			}
			if (!params[v]) {
				params[v] = {
					...expandParams[v]
				}
			}
		})
		onSearch && onSearch(params)
	}

	// 由于搜索参数缓存在store中，导致收起时的参数未处理
	const getValueKey = (obj: any, array: any[], initialValue?: any) => {
		if (array.length === 1) {
			return {
				...obj,
				[array[0]]: initialValue || ''
			}
		}
		if (array.length > 1) {
			const children: any = getValueKey(obj[array[0]] || {}, array.slice(1))
			return {
				...obj,
				[array[0]]: {
					...children
				}
			}
		}
	}

	const getExpand = () => {
		if (expandFormItems && expandFormItems.length) {
			const arr = expandFormItems
			const obj: any = {}
			arr.forEach(v => {
				const { name, initialValue } = v
				const array = name
				if (array.length === 1) {
					obj[name] = v.initialValue || ''
				}
				if (array.length > 1) {
					const children = getValueKey(obj[array[0]] || {}, array.slice(1), initialValue)
					obj[array[0]] = {
						...obj[array[0]],
						...children
					}
				}
			})
			return obj
		}
		return {}
	}

	// 重置
	const onReset = () => {
		form.resetFields()
	}

	// 展开/收起时 重置隐藏的form数据
	const expandReset = () => {
		setSearchExpand(!searchExpand)
		expandFormItems.map(item => {
			const { name } = item
			form.resetFields(name)
		})
	}

	// 按钮偏移
	const getOffset = () => {
		const oLength = formItems.length
		const remainder = oLength % ROW_SHOW_NUMBER
		if (oLength > SPAN_NUMBER) {
			setBtnExpandOffset((ROW_SHOW_NUMBER - 1 - remainder) * 8)
			return
		}
		return setBtnOffset((ROW_SHOW_NUMBER - 1 - remainder) * 8)
	}

	const renderInput = (fieldProps: any) => {
		return React.createElement(Input, { allowClear: true, placeholder: '请输入', style: { width: '100%' }, ...fieldProps })
	}
	const renderTextarea = (fieldProps: any) => {
		return React.createElement(Input.TextArea, {
			allowClear: true,
			placeholder: '请输入',
			style: { width: '100%' },
			...fieldProps
		})
	}
	const renderCheckbox = (fieldProps: any) => {
		return React.createElement(Checkbox, { ...fieldProps })
	}
	const renderSelect = (fieldProps: any) => {
		return React.createElement(Select, { allowClear: true, placeholder: '请选择', style: { width: '100%' }, ...fieldProps })
	}
	const renderDatePicker = (fieldProps: any) => {
		return React.createElement(DatePicker, { allowClear: true, style: { width: '100%' }, ...fieldProps })
	}
	// const renderInputNumber = fieldProps => {
	// 	return React.createElement(InputNumber, { ...fieldProps });
	// };
	const renderCustomComponent = (component: any) => {
		return component
	}
	const renderDateRange = (fieldProps: any) => {
		return React.createElement(DatePicker.RangePicker, { allowClear: true, style: { width: '100%' }, ...fieldProps })
	}

	// 渲染映射
	const formRender: any = {
		input: renderInput,
		// radio: renderRadio,
		select: renderSelect,
		textArea: renderTextarea,
		checkbox: renderCheckbox,
		datePicker: renderDatePicker,
		customer: renderCustomComponent,
		// inputNumber: renderInputNumber,
		dateRange: renderDateRange
	}

	// type: input ,checkbox, select, select, textArea, datePicker, inputNumber, dataRange
	const getFormByType = (type: string, fieldProps: any, component: any) => {
		const renderFn = formRender[type]
		if (renderFn) {
			return type === 'customer' ? renderFn(component) : renderFn(fieldProps)
		}
		return renderInput(fieldProps)
	}

	// 表单字段组件
	const renderItem = (item: any) => {
		const { type, fieldProps, component, ...rest } = item
		return (
			<React.Fragment>
				<Form.Item span={8} {...rest}>
					{getFormByType(type, fieldProps, component)}
				</Form.Item>
			</React.Fragment>
		)
	}

	const renderFormItems = (items: any[]) => {
		return items.map((item: any) => {
			return (
				<Col span={8} key={item.name}>
					{renderItem(item)}
				</Col>
			)
		})
	}

	// 展开/收起
	const renderSearchExpand = () => {
		if (formItems.length > SPAN_NUMBER) {
			return (
				<div className={'expand-icon drop-down-text'} onClick={expandReset}>
					<DownCircleOutlined className={searchExpand ? 'expand' : 'unexpand'} />
					{searchExpand ? '收起' : '展开'}
				</div>
			)
		}
		return null
	}

	return (
		<Form form={form} {...rest} className="form-search-items-box">
			<Row gutter={16}>
				{renderFormItems(showFormItems)}
				{(searchExpand && renderFormItems(expandFormItems)) || null}
				<Col span={8} offset={searchExpand ? btnExpandOffset : btnOffset}>
					<div className={'search-expand'}>
						{renderSearchExpand()}
						<Space>
							<Button type="primary" onClick={handleSearchQuery}>
								查询
							</Button>
							<Button type="default" onClick={onReset}>
								重置
							</Button>
						</Space>
					</div>
				</Col>
			</Row>
		</Form>
	)
}
