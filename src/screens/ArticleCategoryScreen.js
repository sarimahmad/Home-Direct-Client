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
import HeaderWithLeftLogo from "../components/HeaderWithLeftLogo";


function ArticleCategoryScreen({ navigation }) {
  const getArticlesApi = useApi(articlesApi.getArticles);

  useEffect(() => {
    getArticlesApi.request();
  }, []);

  const [searchState, setSearchState] = useState(false)

  return (
    <>
      <HeaderWithLeftLogo headerText={'Home'}
        searchValue={searchState}
        rightMenuPress={() => navigation.openDrawer()}
        backPress={() => this.props.navigation.pop()}
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
            <Card
              title={item.title}
              category={'Deck'}
              imageUrl={item.images[0].url}
              onPress={() => navigation.navigate(routes.ARTICLE_SUB_CATEGORY, item)}
              thumbnailUrl={item.images[0].thumbnailUrl}
            />
          )}
        />
      </Screen>
    </>
  );
}

const styles = StyleSheet.create({
  screen: {
    paddingVertical: 20,
    backgroundColor: colors.light,
  },
});

export default ArticleCategoryScreen;
