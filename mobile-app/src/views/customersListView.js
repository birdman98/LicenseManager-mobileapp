import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { ListItem, Text, Badge, Overlay, Button } from 'react-native-elements';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import axios from '../common/axios';

import { Toast } from 'native-base';

import { THEMES } from '../common/themeUtils';

const CustomersListView = ({ selectedTheme }) => {
  const [customersList, setCustomersList] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [customerToShow, setCustomerToShow] = useState({});
  const [customerStats, setCustomerStats] = useState({});

  useEffect(() => {
    getCustomersList();
  }, []);

  const getCustomersList = () => {
    axios
      .get('/api/customers/customers_list')
      .then(({ data }) => setCustomersList(data))
      .catch((error) =>
        Toast.show({
          text: `Error, ${error.message || error}`,
          textStyle: { fontFamily: 'System' },
          buttonText: 'Dismiss',
          type: 'danger',
        })
      );
  };

  const openCustomerDetailsModal = (customerToShow) => {
    setCustomerToShow(customerToShow);
    getCustomerLicensesStats(customerToShow);
    setIsModalVisible(true);
  };

  const closeCustomerDetailsModal = () => {
    setCustomerToShow({});
    setIsModalVisible(false);
  };

  const getCustomerLicensesStats = ({ id }) => {
    axios
      .get(`/api/licenses/customer_stats?customer_id=${id}`)
      .then(({ data }) => setCustomerStats(data))
      .catch((error) =>
        Toast.show({
          text: `Error, ${error.message || error}`,
          textStyle: { fontFamily: 'System' },
          buttonText: 'Dismiss',
          type: 'danger',
        })
      );
  };

  const renderCustomerDetailsModal = () => {
    const { name, creationDate, lastModificationDate } = customerToShow;

    return (
      <Overlay
        overlayStyle={
          selectedTheme === THEMES.dark ? style.overlayDark : style.overlayLight
        }
        isVisible
        onBackdropPress={closeCustomerDetailsModal}
      >
        <View style={style.view}>
          <Text style={style.mainText}>Customer: {name}</Text>
          <Text style={style.text}>Creation Date: {creationDate}</Text>
          <Text style={style.text}>
            Last Modification Date: {lastModificationDate}
          </Text>
          <Text style={style.text}>
            Total Licenses Count: {customerStats.totalLicensesCount}
          </Text>
          <Text style={style.text}>
            Valid Licenses Count: {customerStats.validLicensesCount}
          </Text>
          <Text style={{ ...style.text, marginBottom: 10 }}>
            Expired Licenses Count: {customerStats.expiredLicensesCount}
          </Text>
          <Button title="Close" onPress={closeCustomerDetailsModal} />
        </View>
      </Overlay>
    );
  };

  const customerDetailsModal = isModalVisible
    ? renderCustomerDetailsModal()
    : null;

  return (
    <ScrollView>
      {customerDetailsModal}
      {customersList.map((customer, index) => (
        <ListItem
          key={index}
          bottomDivider
          topDivider
          onPress={() => openCustomerDetailsModal(customer)}
        >
          <Badge value={++index} status="primary" />
          <ListItem.Content>
            <ListItem.Title>{customer.name}</ListItem.Title>
          </ListItem.Content>
          <ListItem.Subtitle
            style={{
              color: selectedTheme === THEMES.dark ? '#CCCBC8' : '#5E5D5B',
            }}
          >
            {customer.creationDate}
          </ListItem.Subtitle>
        </ListItem>
      ))}
    </ScrollView>
  );
};

const style = StyleSheet.create({
  overlayLight: {
    minHeight: '40%',
    maxHeight: '80%',
    backgroundColor: '#FFFFFF',
  },
  overlayDark: {
    minHeight: '40%',
    maxHeight: '80%',
    backgroundColor: '#000000',
  },
  view: {
    padding: 10,
  },
  mainText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  text: {
    fontSize: 16,
    marginTop: 8,
  },
});

CustomersListView.propTypes = {
  selectedTheme: PropTypes.string.isRequired,
};

const mapStateToProps = ({ app }) => ({
  selectedTheme: app.selectedTheme,
});

export default connect(mapStateToProps)(CustomersListView);
