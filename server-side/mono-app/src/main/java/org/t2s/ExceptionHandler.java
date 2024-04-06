package org.t2s;

import org.hibernate.exception.ConstraintViolationException;
import org.jetbrains.annotations.NotNull;
import org.restframework.web.exceptions.ErrorResponse;
import org.restframework.web.exceptions.ExceptionAdvice;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

@SuppressWarnings("unused")
@ControllerAdvice
public class ExceptionHandler extends ResponseEntityExceptionHandler implements ExceptionAdvice {
    @Override
    public ResponseEntity<ErrorResponse> handleNullPointerException(@NotNull Exception e) {
        return ExceptionAdvice.super.handleNullPointerException(e);
    }

    @Override
    public ResponseEntity<ErrorResponse> handleExceptions(@NotNull Exception e) {
        return ExceptionAdvice.super.handleExceptions(e);
    }

    @Override
    public ResponseEntity<ErrorResponse> handleDataNotFoundException(@NotNull Exception e) {
        return ExceptionAdvice.super.handleDataNotFoundException(e);
    }

    @Override
    public ResponseEntity<ErrorResponse> handleRestException(@NotNull Exception e) {
        return ExceptionAdvice.super.handleRestException(e);
    }

    @Override
    public ResponseEntity<ErrorResponse> handleArithmeticException(@NotNull Exception e) {
        return ExceptionAdvice.super.handleArithmeticException(e);
    }

    @Override
    public ResponseEntity<ErrorResponse> handleIllegalArgumentException(@NotNull Exception e) {
        return ExceptionAdvice.super.handleIllegalArgumentException(e);
    }

    @Override
    public ResponseEntity<ErrorResponse> handleArrayIndexOutOfBoundsException(@NotNull Exception e) {
        return ExceptionAdvice.super.handleArrayIndexOutOfBoundsException(e);
    }

    @Override
    public ResponseEntity<ErrorResponse> handleAssertionError(@NotNull Exception e) {
        return ExceptionAdvice.super.handleAssertionError(e);
    }

    @Override
    public ResponseEntity<ErrorResponse> handleClassCastException(@NotNull Exception e) {
        return ExceptionAdvice.super.handleClassCastException(e);
    }

    @Override
    public ResponseEntity<ErrorResponse> handleUnsupportedOperationException(@NotNull Exception e) {
        return ExceptionAdvice.super.handleUnsupportedOperationException(e);
    }

    @Override
    public ResponseEntity<ErrorResponse> handleNoSuchElementException(@NotNull Exception e) {
        return ExceptionAdvice.super.handleNoSuchElementException(e);
    }

    @Override
    public ResponseEntity<ErrorResponse> handleSecurityException(@NotNull Exception e) {
        return ExceptionAdvice.super.handleSecurityException(e);
    }

    @Override
    public ResponseEntity<ErrorResponse> handleIllegalStateException(@NotNull Exception e) {
        return ExceptionAdvice.super.handleIllegalStateException(e);
    }

    @Override
    public ResponseEntity<ErrorResponse> handleInterruptedException(@NotNull Exception e) {
        return ExceptionAdvice.super.handleInterruptedException(e);
    }

    @Override
    public ResponseEntity<ErrorResponse> handleUnsupportedClassVersionError(@NotNull Exception e) {
        return ExceptionAdvice.super.handleUnsupportedClassVersionError(e);
    }

    @Override
    public ResponseEntity<ErrorResponse> handleClassNotFoundException(@NotNull Exception e) {
        return ExceptionAdvice.super.handleClassNotFoundException(e);
    }

    @Override
    public ResponseEntity<ErrorResponse> handleOutOfMemoryError(@NotNull Exception e) {
        return ExceptionAdvice.super.handleOutOfMemoryError(e);
    }

    @Override
    public ResponseEntity<ErrorResponse> handleNoSuchMethodError(@NotNull Exception e) {
        return ExceptionAdvice.super.handleNoSuchMethodError(e);
    }

    @Override
    public ResponseEntity<ErrorResponse> handleUnsupportedEncodingException(@NotNull Exception e) {
        return ExceptionAdvice.super.handleUnsupportedEncodingException(e);
    }

    @Override
    public ResponseEntity<ErrorResponse> handleIllegalAccessException(@NotNull Exception e) {
        return ExceptionAdvice.super.handleIllegalAccessException(e);
    }

    @Override
    public ResponseEntity<ErrorResponse> handleConstraintViolationException(@NotNull ConstraintViolationException e) {
        return ExceptionAdvice.super.handleConstraintViolationException(e);
    }

    @Override
    public ResponseEntity<ErrorResponse> handleDataIntegrityViolationException(@NotNull DataIntegrityViolationException e) {
        return ExceptionAdvice.super.handleDataIntegrityViolationException(e);
    }

    @Override
    public ResponseEntity<ErrorResponse> handleHttpMessageNotReadableException(@NotNull HttpMessageNotReadableException e) {
        return ExceptionAdvice.super.handleHttpMessageNotReadableException(e);
    }
}
