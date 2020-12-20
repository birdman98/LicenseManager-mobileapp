import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import PropTypes from 'prop-types';
import axios from '../common/axios';

import { Badge, Button, ListItem, Overlay, Text } from 'react-native-elements';
import { Toast } from 'native-base';
import { connect } from 'react-redux';

import { THEMES } from '../common/themeUtils';

const LicensesListView = ({ selectedTheme }) => {
  const [licensesList, setLicensesList] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [licenseToShow, setLicenseToShow] = useState({});

  useEffect(() => {
    getLicensesList();
  }, []);

  const getLicensesList = () => {
    axios
      .get('/api/licenses/list')
      .then(({ data }) => {
        setLicensesList(data);
      })
      .catch((error) =>
        Toast.show({
          text: `Error, ${error.message || error}`,
          textStyle: { fontFamily: 'System' },
          buttonText: 'Dismiss',
          type: 'danger',
        })
      );
  };

  const openLicenseDetailsModal = (licenseToShow) => {
    setLicenseToShow(licenseToShow);
    setIsModalVisible(true);
  };

  const closeLicenseDetailsModal = () => {
    setLicenseToShow({});
    setIsModalVisible(false);
  };

  const renderLicenseDetails = () => {
    const {
      name,
      generationDate,
      expirationDate,
      usedTemplate: { name: templateName },
      isActive,
    } = licenseToShow;

    return (
      <Overlay
        overlayStyle={
          selectedTheme === THEMES.dark ? style.overlayDark : style.overlayLight
        }
        isVisible
        onBackdropPress={closeLicenseDetailsModal}
      >
        <View style={style.view}>
          <Badge
            value={isActive ? 'Active' : 'Disabled'}
            status={isActive ? 'success' : 'error'}
            badgeStyle={style.badge}
          />
          <Text style={style.mainText}>License: {name}</Text>
          <Text style={style.text}>Generation Date: {generationDate}</Text>
          <Text style={style.text}>Expiration Date: {expirationDate}</Text>
          <Text style={{ ...style.text, marginBottom: 30 }}>
            Used Template: {templateName}
          </Text>
          <Button title="Close" onPress={closeLicenseDetailsModal} />
        </View>
      </Overlay>
    );
  };

  const licenseDetailsModal = isModalVisible ? renderLicenseDetails() : null;
  return (
    <ScrollView>
      {licenseDetailsModal}
      {licensesList.map((license, index) => (
        <ListItem
          key={index}
          bottomDivider
          topDivider
          onPress={() => openLicenseDetailsModal(license)}
        >
          <Badge
            value={license.isExpired ? 'EXPIRED' : 'VALID'}
            status={license.isExpired ? 'error' : 'success'}
          />
          <ListItem.Content>
            <ListItem.Title>{license.name}</ListItem.Title>
            <ListItem.Subtitle
              style={{
                color: selectedTheme === THEMES.dark ? '#CCCBC8' : '#5E5D5B',
              }}
            >
              {license.customer.name}
            </ListItem.Subtitle>
          </ListItem.Content>
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
  badge: {
    alignSelf: 'flex-start',
  },
  mainText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  text: {
    fontSize: 18,
    marginTop: 10,
  },
});

LicensesListView.propTypes = {
  selectedTheme: PropTypes.string.isRequired,
};

const mapStateToProps = ({ app }) => ({
  selectedTheme: app.selectedTheme,
});

export default connect(mapStateToProps)(LicensesListView);
