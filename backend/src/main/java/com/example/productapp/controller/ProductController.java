package com.example.productapp.controller;

import com.example.productapp.dto.MessageResponse;
import com.example.productapp.dto.ProductDTO;
import com.example.productapp.model.Product;
import com.example.productapp.service.ProductService;
import jakarta.validation.Valid;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/products")
public class ProductController {

    private static final Logger logger = LoggerFactory.getLogger(ProductController.class);

    @Autowired
    private ProductService productService;

    @GetMapping
    public ResponseEntity<List<Product>> getAllProducts() {
        logger.info("Fetching all products");
        List<Product> products = productService.getAllProducts();
        return ResponseEntity.ok(products);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Product> getProductById(@PathVariable Long id) {
        logger.info("Fetching product with id: {}", id);
        Product product = productService.getProductById(id);
        return ResponseEntity.ok(product);
    }

    @PostMapping
    public ResponseEntity<Product> createProduct(@Valid @RequestBody ProductDTO productDTO) {
        logger.info("Creating new product: {}", productDTO.getName());
        
        Product product = new Product();
        product.setName(productDTO.getName());
        product.setDescription(productDTO.getDescription());
        product.setPrice(productDTO.getPrice());
        
        Product createdProduct = productService.createProduct(product);
        logger.info("Product created successfully with id: {}", createdProduct.getId());
        
        return ResponseEntity.status(HttpStatus.CREATED).body(createdProduct);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Product> updateProduct(@PathVariable Long id, @Valid @RequestBody ProductDTO productDTO) {
        logger.info("Updating product with id: {}", id);
        
        Product productDetails = new Product();
        productDetails.setName(productDTO.getName());
        productDetails.setDescription(productDTO.getDescription());
        productDetails.setPrice(productDTO.getPrice());
        
        Product updatedProduct = productService.updateProduct(id, productDetails);
        logger.info("Product updated successfully with id: {}", id);
        
        return ResponseEntity.ok(updatedProduct);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<MessageResponse> deleteProduct(@PathVariable Long id) {
        logger.info("Deleting product with id: {}", id);
        productService.deleteProduct(id);
        logger.info("Product deleted successfully with id: {}", id);
        
        MessageResponse response = new MessageResponse("Product deleted successfully");
        return ResponseEntity.ok(response);
    }
}