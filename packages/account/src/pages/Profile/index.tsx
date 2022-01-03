import React, { ChangeEvent, ElementType } from 'react'
import {
  Row,
  Col,
  Form,
  Input,
  Button,
  Select,
  PageHeader,
  Container
} from 'shared/components'
import { config, initialValues } from './config'

const { Option } = Select

const itemTypeMap: Record<string, ElementType> = {
  input: Input,
  telephone: (props) => <Input {...props} addonBefore={prefixSelector} />
}

const prefixSelector = (
  <Form.Item name="prefix" noStyle>
    <Select style={{ width: 70 }}>
      <Option value="86">+86</Option>
      <Option value="87">+87</Option>
    </Select>
  </Form.Item>
)

const Profile = () => {
  const [form] = Form.useForm()

  const makeOnChange =
    (name: string) =>
    ({ target }: ChangeEvent<HTMLInputElement>) =>
      form.setFieldsValue({ [name]: target.value })

  const renderFormFields = () =>
    config.map((row, i) => (
      <Row key={`row-${i}`} gutter={48}>
        {row.map(({ label, value, type, required }) => {
          const Component = itemTypeMap[type]
          return (
            <Col key={value} xs={24} md={12}>
              <Form.Item name={value} label={label} rules={[{ required }]}>
                <Component onChange={makeOnChange(value)} />
              </Form.Item>
            </Col>
          )
        })}
      </Row>
    ))

  return (
    <Container maxWidth={960} noHorizontalScroll>
      <PageHeader
        avatar={{ src: 'https://i.pravatar.cc/300' }}
        title="Your personal profile"
        subTitle="Last modified: yesterday"
      />
      <Form form={form} layout="vertical" initialValues={initialValues}>
        {renderFormFields()}
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Save
          </Button>
        </Form.Item>
      </Form>
    </Container>
  )
}

export default Profile
