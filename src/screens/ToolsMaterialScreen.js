import React, { useState } from "react";
import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Modal,
  TouchableHighlight,
  TouchableOpacity,
  Picker,
} from "react-native";
import { MaterialIcons } from '@expo/vector-icons'

import colors from "../config/colors";
import Text from "../components/Text";
import HeaderWithThreeBtn from "../components/HeaderWithThreeBtn";
import { SCREEN } from "../config/Constant";
import { FlatList } from "react-native-gesture-handler";
import Icon from "../components/Icon";

var selectedItem = [];

function ToolsMaterialScreen({ route, navigation }) {
  const params = route.params;
  const [searchState, setSearchState] = useState(false);
  const [loading, setLoading] = useState(false);
  const [seletedSort, setSeletedSort] = useState(false);
  const [itemSelected, setItemSelected] = useState({});
  const [openModelEdit, setOpenModelEdit] = useState(false);
  const [showPicker, setShowPicker] = useState(false);
  const [spoon, setSpoon] = useState('TableSpoon');
  const [spoonValue, setSpoonValue] = useState('2');

  function checkItemInChechList(title) {
    if (selectedItem.includes(title)) {
      const index = selectedItem.indexOf(title);
      selectedItem.splice(index, 1);
      setLoading(!loading);
    } else {
      selectedItem.push(title);
      setLoading(!loading);
    }
  }

  function selectAll(filterList) {
    filterList.forEach(item => {
      checkItemInChechList(item.title)
    })
  }

  return (
    <View style={styles.wrapper}
    >
      <HeaderWithThreeBtn headerText={'Lists'}
        searchValue={searchState}
        rightMenuPress={() => navigation.openDrawer()}
        backPress={() => navigation.pop()}
        searchPress={() => setSearchState(!searchState)} />
      <View style={styles.detailsContainer}>
        <View style={styles.rowView}>
          <View style={styles.titleView}>
            <Text style={styles.title}>{params.listing.title}</Text>
          </View>
          <View style={styles.sortView}>
            <Text style={styles.sortText} onPress={() => setSeletedSort(!seletedSort)}>
              <Text style={styles.sortText}>sort by </Text>
              <Text style={[styles.sortText, { color: colors.orange }]}>{seletedSort === true ? 'tools' : 'material'}</Text>
            </Text>
            <TouchableHighlight style={{ position: 'absolute', right: 5 }}>
              <MaterialIcons name="arrow-drop-down" color={colors.blue} size={20} />
            </TouchableHighlight>
          </View>
        </View>
        {(params.type === 'all' || params.type === 'tool') && <View style={styles.listWrapperView}>
          <View style={styles.listHeaderView}>
            <Text style={styles.headerTitleText}>Tools</Text>
            <View style={styles.headerRightView}>
              <Text onPress={() => selectAll(params.toolsList)} style={[styles.headerTitleText, { marginRight: SCREEN.width / 6 }]}>Select All</Text>
            </View>
          </View>
          <FlatList
            data={params.toolsList}
            keyExtractor={(ite, index) => index.toString()}
            extraData={loading}
            renderItem={(item) => <TouchableOpacity style={styles.itemWrapper} activeOpacity={1} onPress={() => {
              setItemSelected(item.item.title)
              setOpenModelEdit(true)
            }}>
              <Text>🍔</Text>
              <Text style={{ marginLeft: 10 }}>{item.item.title}</Text>
              <View style={styles.headerRightView}>
                <TouchableOpacity onPress={() => checkItemInChechList(item.item.title)}>
                  <Icon name={selectedItem.includes(item.item.title) ? 'checkbox-marked-outline' : "checkbox-blank-outline"} backgroundColor={colors.white} iconColor={colors.black} />
                </TouchableOpacity>
              </View>
            </TouchableOpacity>}
          />
        </View>}
        {(params.type === 'all' || params.type === 'material') && <View style={styles.listWrapperView}>
          <View style={styles.listHeaderView}>
            <Text style={styles.headerTitleText}>Material</Text>
            <View style={styles.headerRightView}>
              <Text onPress={() => selectAll(params.materialsList)} style={[styles.headerTitleText, { marginRight: SCREEN.width / 6 }]}>Select All</Text>
            </View>
          </View>
          <FlatList
            data={params.materialsList}
            keyExtractor={(ite, index) => index.toString()}
            extraData={loading}
            renderItem={(item) => <TouchableOpacity style={styles.itemWrapper} activeOpacity={1} onPress={() => {
              setItemSelected(item.item.title)
              setOpenModelEdit(true)
            }}>
              <Text>🍔</Text>
              <Text style={{ marginLeft: 10 }}>{item.item.title}</Text>
              <View style={styles.headerRightView}>
                <TouchableOpacity onPress={() => checkItemInChechList(item.item.title)}>
                  <Icon name={selectedItem.includes(item.item.title) ? 'checkbox-marked-outline' : "checkbox-blank-outline"} backgroundColor={colors.white} iconColor={colors.black} />
                </TouchableOpacity>
              </View>
            </TouchableOpacity>}
          />
        </View>}

      </View>
      <TouchableOpacity style={styles.AbsoluteAddBtn} activeOpacity={0.8} onPress={() => navigation.navigate('AddNew')} >
        <MaterialIcons name="add" color={colors.white} size={30} />
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={openModelEdit}
        onRequestClose={() => {
          setOpenModelEdit(false)
        }}>
        <TouchableOpacity style={styles.ModalMainView} activeOpacity={0.95} onPress={() => {
          setOpenModelEdit(false)
          setShowPicker(false)
        }}>
          <TouchableOpacity style={styles.ModalBottomView} activeOpacity={1}>
            <View style={styles.TopDividerView}>
              <Text style={styles.TopDividerText}>----</Text>
            </View>
            <Text style={{ alignSelf: 'center', fontSize: 50 }}>🍔</Text>
            {showPicker && <TouchableHighlight style={{ position: 'absolute', top: 30, left: 20, }} underlayColor={colors.white} onPress={() => setShowPicker(false)}>
              <MaterialIcons name="arrow-back" size={25} color={colors.black} />
            </TouchableHighlight>}
            {!showPicker ? <View>
              <View style={{ height: 25, width: ' 80%', alignSelf: 'center', borderWidth: 0.5, borderRadius: 10, paddingHorizontal: 10, marginTop: 25, justifyContent: 'center' }}>
                <Text>{itemSelected}</Text>
              </View>
              <TouchableOpacity
                onPress={() => setShowPicker(true)}
                activeOpacity={0.9}
                style={{ height: 25, width: ' 80%', alignSelf: 'center', borderWidth: 0.5, borderRadius: 10, paddingHorizontal: 10, marginTop: 25, justifyContent: 'center' }}>
                <Text>{spoon}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setShowPicker(true)}
                activeOpacity={0.9}
                style={{ height: 25, width: ' 80%', alignSelf: 'center', borderWidth: 0.5, borderRadius: 10, paddingHorizontal: 10, marginTop: 25, justifyContent: 'center' }}>
                <Text>{spoonValue}</Text>
              </TouchableOpacity>
            </View>
              : <View style={{ height: 100, width: '70%', flexDirection: 'row', alignSelf: 'center', justifyContent: 'center' }}>
                <View style={{ flex: 0.3 }}>
                  <Picker
                    selectedValue={spoonValue}
                    onValueChange={(itemValue, itemIndex) =>
                      setSpoonValue(itemValue)
                    }>
                    <Picker.Item label="0" value="0" />
                    <Picker.Item label="1" value="1" />
                    <Picker.Item label="2" value="2" />
                    <Picker.Item label="3" value="3" />
                    <Picker.Item label="4" value="5" />
                    <Picker.Item label="6" value="6" />
                    <Picker.Item label="7" value="7" />
                    <Picker.Item label="8" value="8" />
                    <Picker.Item label="9" value="9" />
                  </Picker>
                </View>
                <View style={{ flex: 0.7 }}>
                  <Picker
                    selectedValue={spoon}
                    onValueChange={(itemValue, itemIndex) =>
                      setSpoon(itemValue)
                    }>
                    <Picker.Item label="TeaSpoon" value="TeaSpoon" />
                    <Picker.Item label="TableSpoon" value="TableSpoon" />
                    <Picker.Item label="NobleSpoon" value="NobleSpoon" />
                  </Picker>
                </View>
              </View>
            }</TouchableOpacity>
        </TouchableOpacity>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  detailsContainer: {
    flex: 1,
    paddingBottom: 5,
    paddingHorizontal: 10,
  },
  title: {
    fontSize: 14,
    fontWeight: "900",
    color: colors.black
  },
  sortText: {
    fontSize: 12,
  },
  rowView: {
    height: 40,
    width: '100%',
    flexDirection: 'row',
  },
  titleView: {
    flex: 0.7,
    justifyContent: 'center'
  },
  AbsoluteAddBtn: {
    height: 40,
    width: 40,
    position: 'absolute',
    bottom: 50,
    right: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    backgroundColor: '#e03c1f',
  },
  sortView: {
    flex: 0.3,
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingRight: 25,
  },
  listWrapperView: {
    maxHeight: SCREEN.height / 2.3,
    width: '100%',
  },
  listHeaderView: {
    height: 30,
    width: '100%',
    backgroundColor: colors.lightWhite,
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTitleText: {
    fontSize: 13,
    marginLeft: 10,
    fontWeight: '600',
  },
  headerRightView: {
    flex: 1,
    justifyContent: 'center',
    paddingRight: 20,
    alignItems: 'flex-end',
  },
  itemWrapper: {
    height: 30,
    marginVertical: 4,
    alignItems: 'center',
    width: '100%',
    flexDirection: 'row',
  },
  ModalMainView: {
    height: SCREEN.height,
    width: SCREEN.width,
    justifyContent: 'flex-end'
  },
  ModalBottomView: {
    height: SCREEN.height / 2,
    width: SCREEN.width,
    backgroundColor: colors.white,
  },
  TopDividerView: {
    height: 20,
    width: '100%',
    backgroundColor: 'rgba(142,142,142,1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  TopDividerText: {
    color: 'white',
  },
});

export default ToolsMaterialScreen;
