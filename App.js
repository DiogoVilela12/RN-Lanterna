import React, {useState, useEffect} from 'react';
import Torch from 'react-native-torch';
import RNShake from 'react-native-shake';
import {SafeAreaView, StyleSheet, TouchableOpacity, Image} from 'react-native';

const App = () => {
  const [toggleTheme, setToggleTheme] = useState(false);

  const handleChangeToggleTheme = () =>
    setToggleTheme(oldToggleTheme => !oldToggleTheme);

  useEffect(() => {
    Torch.switchState(toggleTheme);
  }, [toggleTheme]);

  useEffect(() => {
    const subscription = RNShake.addListener(() => {
      setToggleTheme(oldToggleTheme => !oldToggleTheme);
    });

    // Retorno de quando o componente for desmontado
    return () => subscription.remove();
  });

  return (
    <SafeAreaView
      style={toggleTheme ? styles.containerBlack : styles.containerWhite}>
      <TouchableOpacity onPress={handleChangeToggleTheme}>
        <Image
          source={
            toggleTheme
              ? require('./assets/icons/eco-light-off.png')
              : require('./assets/icons/eco-light.png')
          }
          style={toggleTheme ? styles.lightOff : styles.lightOn}
        />
        <Image
          source={
            toggleTheme
              ? require('./assets/icons/logo-dio-white.png')
              : require('./assets/icons/logo-dio.png')
          }
          style={styles.dioLogo}
        />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  containerBlack: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerWhite: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  lightOn: {
    resizeMode: 'contain',
    alignSelf: 'center',
    width: 150,
    height: 150,
  },
  lightOff: {
    resizeMode: 'contain',
    alignSelf: 'center',
    tintColor: 'white',
    width: 150,
    height: 150,
  },
  dioLogo: {
    resizeMode: 'contain',
    alignSelf: 'center',
    width: 250,
    height: 250,
  },
});

export default App;
