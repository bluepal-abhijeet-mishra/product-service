package com.example.productapp.service;

import com.example.productapp.exception.ResourceNotFoundException;
import com.example.productapp.model.Product;
import com.example.productapp.repository.ProductRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class ProductService {

    private static final Logger logger = LoggerFactory.getLogger(ProductService.class);

    @Autowired
    private ProductRepository productRepository;

    public List<Product> getAllProducts() {
        logger.debug("Retrieving all products from database");
        return productRepository.findAll();
    }

    public Product getProductById(Long id) {
        logger.debug("Retrieving product with id: {}", id);
        return productRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Product not found with id: " + id));
    }

    public Product createProduct(Product product) {
        logger.debug("Creating new product: {}", product.getName());
        return productRepository.save(product);
    }

    public Product updateProduct(Long id, Product productDetails) {
        logger.debug("Updating product with id: {}", id);
        
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Product not found with id: " + id));
        
        product.setName(productDetails.getName());
        product.setDescription(productDetails.getDescription());
        product.setPrice(productDetails.getPrice());
        
        return productRepository.save(product);
    }

    public void deleteProduct(Long id) {
        logger.debug("Deleting product with id: {}", id);
        
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Product not found with id: " + id));
        
        productRepository.delete(product);
    }
}
