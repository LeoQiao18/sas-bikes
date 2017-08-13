import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { Image as CloudinaryImage } from 'cloudinary-react';
import { Radio, Select, Row, Col, Card, BackTop } from 'antd';
import DeleteBikeButton from './DeleteBikeButton';
import './Dashboard.css';

const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const Option = Select.Option;

class Dashboard extends React.Component {
  state = {
    search: 'all',
    keyword: undefined
  };

  renderSelectOptions() {
    return _.map(this.props.bikes, this.state.search).map(value =>
      <Option key={value} value={value}>
        {value}
      </Option>
    );
  }

  renderSearch() {
    if (this.props.bikes && this.state.search !== 'all') {
      return (
        <div className="search-row keyword-row">
          <span className="search-label">Keyword</span>
          <Select
            showSearch
            className="keyword-input"
            optionFilterProp="children"
            placeholder={`Please enter ${this.state.search} of bike`}
            value={this.state.keyword}
            onChange={value => this.setState({ keyword: value })}
          >
            {this.renderSelectOptions()}
          </Select>
        </div>
      );
    }
  }

  renderContent() {
    const { bikes } = this.props;
    const colGrid = {
      lg: 8,
      md: 12,
      sm: 24
    };
    if (!bikes) {
      return (
        <Col className="bike-card">
          <Card loading bordered={false}>
            Card content
          </Card>
        </Col>
      );
    } else if (!bikes.length) {
      return (
        <Col className="bike-card">
          <Card bordered={false} title="No Bikes">
            Register your bike right now!!!
          </Card>
        </Col>
      );
    } else {
      const { search, keyword } = this.state;
      const filteredBikes =
        search !== 'all' && keyword
          ? _.filter(bikes, { [search]: keyword })
          : bikes;

      return filteredBikes.map(bike => {
        return (
          <Col
            {...colGrid}
            className="bike-card"
            key={bike.cloudinary_public_id}
          >
            <Card bodyStyle={{ padding: 0 }}>
              <div className="bike-card__image">
                <CloudinaryImage
                  cloudName="lqiao"
                  publicId={bike.cloudinary_public_id}
                  width="500"
                  crop="fit"
                />
              </div>
              <div className="bike-card__content">
                <h3>{`${bike.owner.firstName} ${bike.owner.lastName}`}</h3>
                <p>
                  Brand: {bike.brand}
                </p>
                <p>
                  Color: {bike.color}
                </p>
                {!!bike.description.length
                  ? <p>
                      {bike.description}
                    </p>
                  : null}
              </div>
              <div className="bike-card__buttons">
                <DeleteBikeButton bikeId={bike._id} />
              </div>
            </Card>
          </Col>
        );
      });
    }
  }

  render() {
    return (
      <div>
        <BackTop />
        <div className="search-row">
          <span className="search-label">Search by</span>
          <RadioGroup
            size="small"
            defaultValue="all"
            onChange={e =>
              this.setState({ search: e.target.value, keyword: undefined })}
          >
            <RadioButton value="all">All</RadioButton>
            <RadioButton value="color">Color</RadioButton>
            <RadioButton value="brand">Brand</RadioButton>
          </RadioGroup>
        </div>
        {this.renderSearch()}
        <Row gutter={16}>
          {this.renderContent()}
        </Row>
      </div>
    );
  }
}

function mapStateToProps({ bikes }) {
  return { bikes };
}

export default connect(mapStateToProps)(Dashboard);
