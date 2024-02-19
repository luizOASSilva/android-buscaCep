import { StyleSheet} from 'react-native';
import {SafeAreaView, TextInput,  StatusBar, TouchableOpacity, Text, View} from 'react-native';
import React, {useState} from 'react';

export default function App() {

  const [cep, setCep] = useState();
  const [adress, setAdress] = useState();
  const [error, setError] = useState();

  async function handleGetAdress(){
    const url = `https://viacep.com.br/ws/${cep}/json/`;

      await fetch(url)
      .then(async (res) => {

        let data = await res.json()

        if(data?.erro){
          alert("CEP inválido! Tente novamente")
          setAdress()
          console.log(data)
        }else{
          setError()
          setAdress(data)
        }
      })
      .catch(e => {
        setError(e),
        alert("CEP inválido! Tente novamente")
        setAdress()
      })
    setCep()
  }

  function cepFormat(value){
    setCep(value.replace(/^(\d{5})(\d{3})$/,'$1-$2'))
  }

  return (
    <>
      <SafeAreaView style={styles.container}>

        <Text style={styles.title}>BUSCADOR DE CEP</Text>

        <Text style={styles.subText}>Insira o cep:</Text>

        <View removeClippedSubviews={true}>
          <TextInput
          maxLength={9}
            ontextMenuHidden={true}
            value={cep}
            onChangeText={(e) => 
              cepFormat(e)
            }
            style={styles.input}
            placeholder='0000-000'
            keyboardType='numeric'
          />
        </View>

        <TouchableOpacity onPress={() => handleGetAdress()} style={styles.button}>
          <Text style={styles.textButton}> PESQUISAR </Text>
        </TouchableOpacity>

        <View style={styles.containerAddr}>
          <Text style={styles.textRef}>CEP: <Text style={styles.textRes}>{adress?.cep}</Text></Text>
          <Text style={styles.textRef}>Logradouro: <Text style={styles.textRes}>{adress?.logradouro}</Text></Text>
          <Text style={styles.textRef}>Complemento: <Text style={styles.textRes}>{adress?.complemento}</Text></Text>
          <Text style={styles.textRef}>Bairro: <Text style={styles.textRes}>{adress?.bairro}</Text></Text>
          <Text style={styles.textRef}>UF: <Text style={styles.textRes}>{adress?.uf}</Text></Text>
          <Text style={styles.textRef}>DDD: <Text style={styles.textRes}>{adress?.ddd}</Text></Text>
        </View>

      </SafeAreaView>

      <StatusBar style="hidden"/>
    </>
  );
};


const styles = StyleSheet.create({
  title: {
    letterSpacing: 4,
    fontSize: 20,
    color:'#4B0082',
    paddingTop: 40,
  },

  container:{
    display: 'flex',
    alignItems: 'center',
  },

  input: {
    width: 300,
    height: 40,
    borderWidth: 1,
    padding: 10,
    marginBottom: 12,
  },

  button: { 
    width: 300,
    height: 40,
    padding: 5,
    backgroundColor: '#4B0082',
  },

  textButton: {
    fontSize: 14,
    paddingTop: 4,
    textAlign:'center',
    color:'white',
  },

  containerAddr: {
    paddingTop: 10,
    width: 300,
  },

  textRef: {
    padding: 5,
    fontWeight: 'bold',
    color:'#4B0082',
  },

  textRes: {
    color: 'black',
    fontWeight: 'normal',
  },

  subText: {
    color: '#515151',
    marginTop: 20,
    paddingBottom: 5,
    width: 300,
    display:'flex',
    fontSize: 13,
  }
});
