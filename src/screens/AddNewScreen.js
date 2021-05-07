import React, { useState } from "react";
import {
  View,
  SafeAreaView,
  StyleSheet,
  Modal,
  TouchableOpacity,
  SectionList,
  Image,
  Text
} from "react-native";
import { Entypo, AntDesign, MaterialIcons } from "@expo/vector-icons";

import colors from "../config/colors";
import { SCREEN } from "../config/Constant";
import { FlatList, TextInput } from "react-native-gesture-handler";
import { color, set } from "react-native-reanimated";

function AddNewScreen({ route, navigation }) {
  const [searchValue, setSearchValue] = useState('');
  return (

    <View style={styles.WrapperView}>
      <SafeAreaView style={styles.WrapperView}>
        <View style={styles.rowView}>
          <View style={styles.textInputWrapper}>
            <MaterialIcons name="add" color={colors.secondary} size={30} />
            <TextInput style={{ height: 40, width: '80%' }} onChangeText={(value) => setSearchValue(value)} value={searchValue} />
            {searchValue !== '' &&
              <TouchableOpacity
                onPress={() => setSearchValue('')}
                style={{ position: 'absolute', right: 5, height: 40, width: 30, justifyContent: 'center', alignItems: 'center' }}>
                <Entypo name='circle-with-cross' size={20} color={colors.black} />
              </TouchableOpacity>}
          </View>
          <Text onPress={() => navigation.pop()} style={styles.doneText}>Done</Text>
        </View>
        <View style={{ flex: 1, backgroundColor: colors.light }}>
          <FlatList
            data={['butter', 'Butter coockies', 'butter mix']}
            keyExtractor={(item, index) => index.toString()}
            renderItem={(item, index) => <TouchableOpacity
            onPress={() => navigation.pop()}
              style={{
                height: 40,
                minWidth: 200,
                maxWidth: 250,
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 15,
              }}>
                <View style={{
                minWidth: 100,
                maxWidth: 250,
                flexDirection: 'row',
                alignItems: 'center',
                paddingHorizontal: 10,
                backgroundColor: colors.white,
                borderRadius: 20,
              }}>
              <MaterialIcons name="add" color={colors.grey} size={30} />
              <Text style={{ fontSize: 15, marginLeft: 14 }}>
                {item.item + '     ' + '🍔'}
              </Text>
              </View>
            </TouchableOpacity>} />
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  detailsContainer: {
    padding: 20,
  },
  WrapperView: {
    flex: 1,
  },
  rowView: {
    height: 80,
    width: '90%',
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center'
  },
  textInputWrapper: {
    height: 40,
    width: '85%',
    borderRadius: 20,
    borderWidth: 0.4,
    borderColor: colors.grey,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 5,
  },
  doneText: {
    fontSize: 15,
    color: colors.secondary,
    marginLeft: 15,
  },

});

export default AddNewScreen;
