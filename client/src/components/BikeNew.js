import React from 'react';
import { Form, Icon, Input, Select, Upload, Button, message } from 'antd';
import { connect } from 'react-redux';
import axios from 'axios';
import { postBike } from '../actions';

import './BikeNew.css';

const FormItem = Form.Item;
const Option = Select.Option;
const Dragger = Upload.Dragger;

class BikeNew extends React.Component {
  state = {
    allowUpload: true,
    uploadedPublicId: null
  };

  componentDidMount() {
    window.addEventListener('beforeunload', this.deleteImage.bind(this));
  }

  componentWillUnmount() {
    this.deleteImage();
    window.removeEventListener('beforeunload', this.componentCleanup);
  }

  handleSubmit = e => {
    e.preventDefault();
    if (this.state.uploadedPublicId) {
      this.props.form.validateFields((err, values) => {
        if (!err) {
          const { firstName, lastName, classYear, color, brand } = values;
          const description = values.description ? values.description : '';
          const {
            public_id: cloudinary_public_id,
            secure_url: image_url
          } = values.image[0].response;
          const data = {
            firstName,
            lastName,
            classYear,
            color,
            brand,
            description,
            cloudinary_public_id,
            image_url
          };
          this.props.postBike(data);
          message.success('Bike registration successful!');
          this.cleanForm(() => {
            this.props.history.push('/');
          });
        }
      });
    }
  };

  normFile = e => {
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

  cleanForm(callback) {
    this.props.form.resetFields();
    this.setState({ uploadedPublicId: null }, callback);
  }

  deleteImage() {
    if (this.state.uploadedPublicId) {
      axios
        .delete(`/api/images/${this.state.uploadedPublicId}`)
        .then(() => this.setState({ uploadedPublicId: null }));
    }
  }

  render() {
    const { getFieldDecorator } = this.props.form;

    window.form = this.props.form;

    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 }
    };

    const draggerProps = {
      accept: 'image/*',
      action: '/api/images',
      onRemove(file) {}
    };

    return (
      <div>
        <h1 className="bike-new__title">Register a New Bike</h1>
        <Form onSubmit={this.handleSubmit} hideRequiredMark>
          {/* First Name */}
          <FormItem {...formItemLayout} label="First Name" hasFeedback>
            {getFieldDecorator('firstName', {
              rules: [
                { required: true, message: 'Please enter your first name!' }
              ]
            })(<Input placeholder="Please enter your first name" />)}
          </FormItem>

          {/* Last Name */}
          <FormItem {...formItemLayout} label="Last Name" hasFeedback>
            {getFieldDecorator('lastName', {
              rules: [
                { required: true, message: 'Please enter your last name!' }
              ]
            })(<Input placeholder="Please enter your last name" />)}
          </FormItem>

          {/* Class */}
          <FormItem {...formItemLayout} label="Class Year" hasFeedback>
            {getFieldDecorator('classYear', {
              rules: [
                { required: true, message: 'Please enter your class year!' }
              ]
            })(<Input placeholder="Please enter your class year" />)}
          </FormItem>

          {/* Color */}
          <FormItem {...formItemLayout} label="Color" hasFeedback>
            {getFieldDecorator('color', {
              rules: [
                { required: true, message: 'Please enter color of bike!' }
              ]
            })(
              <Select
                showSearch
                optionFilterProp="children"
                placeholder="Please enter color of bike"
                filterOption={(input, option) =>
                  option.props.children
                    .toLowerCase()
                    .indexOf(input.toLowerCase()) >= 0}
              >
                <Option value="Black">Black</Option>
                <Option value="Grey">Grey</Option>
                <Option value="White">White</Option>
                <Option value="Ivory">Ivory</Option>
                <Option value="Silver">Silver</Option>
                <Option value="Gold">Gold</Option>
                <Option value="Red">Red</Option>
                <Option value="Pink">Pink</Option>
                <Option value="Orange">Orange</Option>
                <Option value="Yellow">Yellow</Option>
                <Option value="Green">Green</Option>
                <Option value="Blue">Blue</Option>
                <Option value="Purple">Purple</Option>
                <Option value="Brown">Brown</Option>
              </Select>
            )}
          </FormItem>

          {/* Brand */}
          <FormItem {...formItemLayout} label="Brand" hasFeedback>
            {getFieldDecorator('brand', {
              rules: [
                { required: true, message: 'Please enter brand of bike!' }
              ]
            })(<Input placeholder="Please enter brand of bike" />)}
          </FormItem>

          {/* Description */}
          <FormItem
            {...formItemLayout}
            label="Description"
            extra="(Optional, 100 characters max.)"
            hasFeedback
          >
            {getFieldDecorator('description', {
              rules: [{ max: 100, message: 'Please limit to 100 characters!' }]
            })(
              <Input placeholder="Describe your bike (max: 100 characters)" />
            )}
          </FormItem>

          {/* Image */}
          <FormItem {...formItemLayout} label="Image">
            {getFieldDecorator('image', {
              valuePropName: 'fileList',
              getValueFromEvent: this.normFile,
              rules: [
                {
                  required: true,
                  message: 'Please upload an image of your bike!'
                }
              ]
            })(
              <Dragger
                {...draggerProps}
                disabled={!this.state.allowUpload}
                onRemove={this.deleteImage.bind(this)}
                onChange={info => {
                  if (!!info.fileList.length === this.state.allowUpload) {
                    this.setState({ allowUpload: !this.state.allowUpload });
                  }
                  const status = info.file.status;
                  if (status === 'done') {
                    message.success(
                      `${info.file.name} file uploaded successfully.`
                    );
                    this.setState({
                      uploadedPublicId: info.file.response.public_id
                    });
                  } else if (status === 'error') {
                    message.error(`${info.file.name} file upload failed.`);
                  }
                }}
              >
                <p className="ant-upload-drag-icon">
                  <Icon type="inbox" />
                </p>
                <p className="ant-upload-text">
                  Click or drag image to this area to upload
                </p>
                <p className="ant-upload-hint">
                  Only allow uploading of one image. If you are on a mobile
                  device, you can take a photo or choose from gallery.
                </p>
              </Dragger>
            )}
          </FormItem>

          <FormItem wrapperCol={{ span: 12, offset: 6 }}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </FormItem>
        </Form>
      </div>
    );
  }
}

export default connect(null, { postBike })(Form.create()(BikeNew));
