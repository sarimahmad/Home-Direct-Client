import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, SectionList, View, Text } from "react-native";

import ActivityIndicator from "../components/ActivityIndicator";
import Button from "../components/Button";
import Card from "../components/Card";
import colors from "../config/colors";
import articlesApi from "../api/articles";
import routes from "../navigation/routes";
import Screen from "../components/Screen";
import AppText from "../components/Text";
import useApi from "../hooks/useApi";
import HeaderWithThreeBtn from "../components/HeaderWithThreeBtn";


function ArticlesScreen({ navigation, route }) {
  const getArticlesApi = useApi(articlesApi.getArticles);

  useEffect(() => {
    getArticlesApi.request();
  }, []);

  const [searchState, setSearchState] = useState(false)

  return (
    <View style={styles.mainScreen}>
      <HeaderWithThreeBtn headerText={route.params ?.name}
        searchValue={searchState}
        rightMenuPress={() => navigation.openDrawer()}
        backPress={() => navigation.pop()}
        searchPress={() => setSearchState(!searchState)} />
      <ActivityIndicator visible={getArticlesApi.loading} />
      <Screen style={styles.screen}>
        {getArticlesApi.error && (
          <>
            <AppText>Couldn't retrieve the articles.</AppText>
            <Button title="Retry" onPress={getArticlesApi.request} />
          </>
        )}
        <FlatList
          data={getArticlesApi.data}
          keyExtractor={(article) => article.id.toString()}
          renderItem={({ item }) => (
            item.categoryId === route.params.id ? 
            <Card
              title={item.title}
              category={route.params ?.name}
              imageUrl={item.images[0].url}
              onPress={() => navigation.navigate(routes.ARTICLE_DETAILS, {item: item, name: route.params?.name})}
              thumbnailUrl={item.images[0].thumbnailUrl}
            /> : <></>
          )}
        />
      </Screen>
    </View>
  );
}

const styles = StyleSheet.create({
  mainScreen: {
   flex: 1,
  },
  screen: {
    paddingTop: 10,
    backgroundColor: colors.light,
  },
});

export default ArticlesScreen;
