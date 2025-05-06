INSERT INTO
  public.tax_return (id, year, person_id, name)
VALUES
  (
    'bd5ade8e-cb7f-427d-935c-e09d0407b9bd',
    '2025',
    '1203894569',
    'Jökull Þórðarson'
  );

INSERT INTO
  public.income (id, type, tax_return_id)
VALUES
  (
    'b144dc92-216c-4f3c-a2c1-31742109ba3c',
    'prefill',
    'bd5ade8e-cb7f-427d-935c-e09d0407b9bd'
  );

INSERT INTO
  public.income_types (id, code, name)
VALUES
  (
    'c32f9c31-6536-426d-80a1-b9ea326f9207',
    '2.1',
    'Launatekjur og starfstengdar greiðslur'
  );

INSERT INTO
  public.income_types (id, code, name)
VALUES
  (
    'c32f9c31-6536-426d-80a1-b9ea326f9208',
    '2.2',
    'Ökutækjastyrkur. Dagpeningar. Hlunnindi.'
  );

INSERT INTO
  public.income_types (id, code, name)
VALUES
  (
    'c32f9c31-6536-426d-80a1-b9ea326f9209',
    '2.3',
    'Lífeyrisgreiðslur. Greiðslur frá Tryggingastofnun. Aðrar bótagreiðslur, styrkir o.fl.'
  );

INSERT INTO
  public.income_lines (
    id,
    income_id,
    income_type_id,
    label,
    value,
    currency
  )
VALUES
  (
    '2ae34c93-a332-4df6-badb-5363465ff450',
    'b144dc92-216c-4f3c-a2c1-31742109ba3c',
    'c32f9c31-6536-426d-80a1-b9ea326f9207',
    'Norðurljós Software ehf',
    9360000,
    'ISK'
  );

INSERT INTO
  public.income_lines (
    id,
    income_id,
    income_type_id,
    label,
    value,
    currency
  )
VALUES
  (
    '2ae34c93-a332-4df6-badb-5363465ff451',
    'b144dc92-216c-4f3c-a2c1-31742109ba3c',
    'c32f9c31-6536-426d-80a1-b9ea326f9207',
    'Mús & Merki ehf.',
    960000,
    'ISK'
  );

INSERT INTO
  public.income_lines (
    id,
    income_id,
    income_type_id,
    label,
    value,
    currency
  )
VALUES
  (
    '2ae34c93-a332-4df6-badb-5363465ff452',
    'b144dc92-216c-4f3c-a2c1-31742109ba3c',
    'c32f9c31-6536-426d-80a1-b9ea326f9208',
    'Dagpeningar',
    120000,
    'ISK'
  );

INSERT INTO
  public.income_lines (
    id,
    income_id,
    income_type_id,
    label,
    payer,
    value,
    currency
  )
VALUES
  (
    '2ae34c93-a332-4df6-badb-5363465ff453',
    'b144dc92-216c-4f3c-a2c1-31742109ba3c',
    'c32f9c31-6536-426d-80a1-b9ea326f9209',
    'Íþróttastyrkur',
    'Norðurljós Software ehf',
    75000,
    'ISK'
  );

INSERT INTO
  public.income_lines (
    id,
    income_id,
    income_type_id,
    label,
    payer,
    value,
    currency
  )
VALUES
  (
    '2ae34c93-a332-4df6-badb-5363465ff454',
    'b144dc92-216c-4f3c-a2c1-31742109ba3c',
    'c32f9c31-6536-426d-80a1-b9ea326f9209',
    'Starfsmenntastyrkur',
    'VR',
    130000,
    'ISK'
  );
