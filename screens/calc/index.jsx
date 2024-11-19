import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, Alert, ScrollView } from 'react-native';
import { stylescalc } from './style';
import Cabecalho from '../../components/header';
import FooterComponent from '../../components/footer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from "@react-navigation/native";
import apiConfig from "../../utils/api";

export default function CalculadoraEnem() {
  const navigation = useNavigation();

  // Estados para armazenar os valores de acertos de cada área
  const [cienciasHumanas, setCienciasHumanas] = useState('');
  const [linguagens, setLinguagens] = useState('');
  const [cienciasNatureza, setCienciasNatureza] = useState('');
  const [matematica, setMatematica] = useState('');
  const [redacao, setRedacao] = useState('');

  const [id, setId] = useState('')

  const [pesocienciasHumanas, setpesoCienciasHumanas] = useState('');
  const [pesolinguagens, setpesoLinguagens] = useState('');
  const [pesocienciasNatureza, setpesoCienciasNatureza] = useState('');
  const [pesomatematica, setpesoMatematica] = useState('');
  const [pesoredacao, setpesoRedacao] = useState('');

  // Carregar o estado de login do AsyncStorage
  useEffect(() => {
    const checkLoginStatus = async () => {
      const loginStatus = await AsyncStorage.getItem('verificaLogin');
      if (loginStatus === 'false') {
        navigation.navigate("Login");
        return;
      }
    };
    checkLoginStatus();
  }, []);

  // Função para calcular a pontuação total e enviar para a API
  async function calcularPontuacao() {
    const id = await AsyncStorage.getItem('id')
    setId(id)

    // Enviar dados para a API
    try {
      let response = await apiConfig.post('/media', {
        cienciasHumanas: cienciasHumanas,
        linguagens: linguagens,
        cienciasNatureza: cienciasNatureza,
        matematica: matematica, 
        redacao: redacao,

        usuario_id: id,

        pesohuma: pesocienciasHumanas,
        pesoling: pesolinguagens,
        pesonatu: pesocienciasNatureza,
        pesomat: pesomatematica,
        pesoreda: pesoredacao,
      });
    
      if (response.status === 200) {
        const {title} = response.data;
        console.log(title);
        Alert.alert(`Resultado Aproximado ENEM: ${response.data}`); // Exibe o title em um alert
        
      } else {
        console.log('Erro', 'Não foi possível enviar os dados para a API');
      }
    } catch (error) {
      console.error("Erro ao enviar dados para a API:", error);
      console.log('Erro', 'Ocorreu um erro ao enviar os dados para a API');
    }
  };

  const limparCampos = () => {
    setCienciasHumanas('');
    setLinguagens('');
    setCienciasNatureza('');
    setMatematica('');
    setRedacao('');
  };


  return (
    <ScrollView >
        <Cabecalho/>
        <View style={stylescalc.container}>
      <Text style={stylescalc.title}>Digite o número de acertos em cada prova:</Text>
      <View style={stylescalc.espaco}>
      <View>
        <View style={stylescalc.field}>
        <Text>Ciências Humanas (0 - 45):</Text>
        <TextInput
          style={stylescalc.input}
          keyboardType="numeric"
          value={cienciasHumanas}
          onChangeText={setCienciasHumanas}
        />
      </View>

      <View style={stylescalc.field}>
        <Text>Linguagens e Códigos (0 - 45):</Text>
        <TextInput
          style={stylescalc.input}
          keyboardType="numeric"
          value={linguagens}
          onChangeText={setLinguagens}
        />
      </View>

      <View style={stylescalc.field}>
        <Text>Ciências da Natureza (0 - 45):</Text>
        <TextInput
          style={stylescalc.input}
          keyboardType="numeric"
          value={cienciasNatureza}
          onChangeText={setCienciasNatureza}
        />
      </View>

      <View style={stylescalc.field}>
        <Text>Matemática (0 - 45):</Text>
        <TextInput
          style={stylescalc.input}
          keyboardType="numeric"
          value={matematica}
          onChangeText={setMatematica}
        />
      </View>

      <View style={stylescalc.field}>
        <Text>Redação (0 - 1000):</Text>
        <TextInput
          style={stylescalc.input}
          keyboardType="numeric"
          value={redacao}
          onChangeText={setRedacao}
        />
      </View>

        </View>

      {/* pesos */}

      <View>
            <View style={stylescalc.field}>
                <Text>Peso(0 - 5):</Text>
                <TextInput
                style={stylescalc.input}
                keyboardType="numeric"
                value={pesocienciasHumanas}
                onChangeText={setpesoCienciasHumanas}
                />
            </View>
            <View style={stylescalc.field}>
                <Text>Peso (0 - 5):</Text>
                <TextInput
                style={stylescalc.input}
                keyboardType="numeric"
                value={pesolinguagens}
                onChangeText={setpesoLinguagens}
                />
            </View>
            <View style={stylescalc.field}>
                <Text>Peso (0 - 5):</Text>
                <TextInput
                style={stylescalc.input}
                keyboardType="numeric"
                value={pesocienciasNatureza}
                onChangeText={setpesoCienciasNatureza}
                />
            </View>
            <View style={stylescalc.field}>
                <Text>Peso (0 - 5):</Text>
                <TextInput
                style={stylescalc.input}
                keyboardType="numeric"
                value={pesomatematica}
                onChangeText={setpesoMatematica}
                />
            </View>
            <View style={stylescalc.field}>
                <Text>Peso (0 - 5):</Text>
                <TextInput
                style={stylescalc.input}
                keyboardType="numeric"
                value={pesoredacao}
                onChangeText={setpesoRedacao}
                />
            </View>

      </View>

      </View>


      <View style={stylescalc.buttonContainer}>
        <Button title="CALCULAR" onPress={calcularPontuacao}  />
        <Button title="LIMPAR" onPress={limparCampos} color="red" />
      </View>
    </View>
    <FooterComponent/>
    </ScrollView>
  );
}