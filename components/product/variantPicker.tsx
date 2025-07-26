'use client';

import { useState, useCallback } from 'react';
import {
  IProductItem,
  IVariantCombination,
  IVariantCharacteristic,
} from 'boundless-api-client';
import AddToCart from '@/components/product/addToCart';
import { IBasicSettings } from 'boundless-commerce-components';
import PriceAndSku from '@/components/product/priceAndSku';

export default function VariantPicker({
  product,
  settings,
}: {
  product: IProductItem;
  settings?: IBasicSettings;
}) {
  // Casts explicites pour éviter les erreurs TS
  const variants = Array.isArray(product.extendedVariants?.combinations)
    ? (product.extendedVariants.combinations as IVariantCombination[])
    : [];

  const characteristics = Array.isArray(product.extendedVariants?.characteristics)
    ? product.extendedVariants.characteristics
    : [];

  const hasExtendedVariants = variants.length > 0;

  const [selectedVariant, setSelectedVariant] = useState<IVariantCombination | undefined>();

  const onCaseChange = useCallback((value: {}, variant?: IVariantCombination) => {
    setSelectedVariant(variant ?? undefined);
  }, []);

  if (!product.has_variants || !hasExtendedVariants) {
    return (
      <div className="p-3 bg-warning bg-opacity-10 rounded border border-warning">
        <div className="d-flex align-items-center">
          <i className="bi bi-exclamation-triangle text-warning me-2"></i>
          <span className="text-warning">Variantes non disponibles</span>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Sélecteurs de caractéristiques */}
      <div className="mb-4">
        {characteristics.map((characteristic) => (
          <div key={characteristic.characteristic_id} className="mb-3">
            <label className="form-label fw-semibold">{characteristic.title}:</label>
            <div className="d-flex gap-2 flex-wrap">
              {characteristic.values?.map((value) => {
                const matchingVariant = variants.find((variant) =>
                  variant.characteristics?.some(
                    (char: IVariantCharacteristic) => char.value_id === value.value_id
                  )
                );

                const isSelected =
                  selectedVariant &&
                  selectedVariant.characteristics?.some(
                    (char: IVariantCharacteristic) => char.value_id === value.value_id
                  );

                return (
                  <button
                    key={value.value_id}
                    className={`btn ${isSelected ? 'btn-primary' : 'btn-outline-primary'} btn-sm`}
                    onClick={() => {
                      if (matchingVariant) {
                        setSelectedVariant(matchingVariant);
                      }
                    }}
                    disabled={!matchingVariant}
                  >
                    {value.title}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Affichage de la variante sélectionnée */}
      {selectedVariant && (
        <div className="mb-3 p-3 bg-light rounded">
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <strong>{selectedVariant.title}</strong>
              <div className="small text-muted">SKU: {selectedVariant.sku}</div>
            </div>
            <div className="text-end">
              {selectedVariant.in_stock ? (
                <span className="badge bg-success">En stock</span>
              ) : (
                <span className="badge bg-danger">Rupture</span>
              )}
            </div>
          </div>
        </div>
      )}

      <PriceAndSku product={product} settings={settings} variant={selectedVariant} />

      <AddToCart
        itemId={selectedVariant?.inventoryItem?.item_id}
        disabled={!selectedVariant?.in_stock}
      />
    </div>
  );
}
