import { Link, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Text, TextInput, View, TouchableOpacity, StyleSheet, Modal } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';
import { useState } from 'react';

export default function ReviewComment() {
  const [modalVisible, setModalVisible] = useState(false);
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(0); // Estado para armazenar a nota de review

  const handleAddComment = () => {
    // Função para lidar com o envio do comentário
    console.log(comment, rating);
    setModalVisible(false);
  };

  // Função para definir a nota
  const handleRating = (newRating) => {
    setRating(newRating);
  };

  return (
    <View style={styles.container}>
      {/* Seção de estrelas para avaliação - movida para fora do modal */}
      <View style={styles.starsContainer}>
        {[1, 2, 3, 4, 5].map((star) => (
          <TouchableOpacity key={star} onPress={() => handleRating(star)}>
            <Icon
              name={star <= rating ? 'star' : 'star-o'} // Ícone preenchido se a nota for igual ou menor que o número da estrela
              size={30}
              color="#FFD700" // Cor dourada para indicar a seleção
              style={styles.star}
            />
          </TouchableOpacity>
        ))}
    </View>

    <TouchableOpacity style={styles.button} onPress={() => setModalVisible(true)}>
        <Text style={styles.buttonText}>Adicionar Comentário</Text>
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {/* Botão X para fechar o modal */}
            <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
              <Icon name="close" size={16} color="#AB72CE" />
            </TouchableOpacity>

            <TextInput
              style={styles.input}
              placeholder="Digite seu comentário..."
              value={comment}
              onChangeText={(text) => setComment(text)}
              multiline={true}
              textAlignVertical="top"
            />

            {/* Botão Enviar */}
            <TouchableOpacity style={styles.modalButton} onPress={handleAddComment}>
              <Text style={styles.buttonText}>Enviar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    width: "15%",
    height: 40,
    backgroundColor: "#AB72CE",
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 12,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "70%",
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
    position: "relative", // Para posicionar o botão X
  },
  closeButton: {
    position: "absolute",
    top: 1,
    right: 10,
    zIndex: 1, // Para garantir que o botão fique acima de outros elementos
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    height: 100,
    marginBottom: 20,
    textAlignVertical: "top",
  },
  modalButton: {
    width: "15%", 
    height: 40,
    backgroundColor: "#AB72CE",
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center", 
  },
  starsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  star: {
    marginHorizontal: 5,
  },
});
