#!/usr/bin/env bash

function clean() {
  (exec rm -rf {client,intermediate,root,server})
}

function key() {
  (exec openssl ecparam -name secp384r1 -genkey | openssl ec -aes-256-cbc -out $1/key/${2:-$1})
  (exec openssl ec -in $1/key/${2:-$1} -pubout -out $1/key/${2:-$1}.pub)
  (exec chmod 400 $1/key/${2:-$1})
}

function root() {
  key root

  (exec openssl req -config openssl.cnf -key root/key/root -new -extensions ext_root -out root/crt/root -x509 -days 3650)
  (exec chmod 444 root/crt/root)
}

function intermediate() {
  key ${1:-intermediate}

  (exec openssl req -config openssl.cnf -new -key intermediate/key/${1:-intermediate} -out intermediate/csr/${1:-intermediate})
  (exec openssl ca -config openssl.cnf -name ca_root -extensions ext_intermediate -notext -in intermediate/csr/${1:-intermediate} -out intermediate/crt/${1:-intermediate})
  (exec chmod 444 intermediate/crt/${1:-intermediate})
  (exec openssl x509 -noout -text -in intermediate/crt/${1:-intermediate})
  (exec openssl verify -CAfile root/crt/root intermediate/crt/${1:-intermediate})
  (exec cat intermediate/crt/${1:-intermediate} root/crt/root > intermediate/crt/chain)
  (exec chmod 444 intermediate/crt/chain)
  (exec openssl ca -config openssl.cnf -gencrl -out root/crl/root)
  (exec openssl crl -in root/crl/root -noout -text)
}

function certificate() {
  key $1 $2

  (exec openssl req -config openssl.cnf -new -key $1/key/$2 -out $1/csr/$2)
  (exec openssl ca -config openssl.cnf -extensions ext_client -notext -in $1/csr/$2 -out $1/crt/$2)
  (exec chmod 444 $1/crt/$2)
  (exec openssl x509 -noout -text -in $1/crt/$2)
  (exec openssl verify -CAfile intermediate/crt/chain $1/crt/$2)
  (exec openssl pkcs12 -export -out $1/pfx/$2 -inkey $1/key/$2 -in $1/crt/$2 -certfile intermediate/crt/chain)
  (exec openssl ca -config openssl.cnf -gencrl -out intermediate/crl/intermediate)
  (exec openssl crl -in intermediate/crl/intermediate -noout -text)
}

function revoke() {
  (exec openssl ca -config openssl.cnf -revoke intermediate/new/$1)
  (exec openssl ca -config openssl.cnf -gencrl -out intermediate/crl/intermediate)
}

function setup() {
  (exec mkdir -p {root,intermediate}/{crt,crl,csr,new,key})
  (exec mkdir -p {client,server}/{crt,csr,pfx,key})
  (exec touch {root,intermediate}/database)
  (exec echo 1000 | tee {root,intermediate}/{serial,crlnumber} &> /dev/null)
  (exec chmod 700 {root,intermediate,client,server}/key)
}

function use() {
  echo "USAGE: [clean, key, root, intermediate, certificate, revoke, setup]"
}

case "${1}" in
  'clean')        clean                 ;;
  'key')          key           $2 $3   ;;  # root [root]
  'root')         root                  ;;
  'intermediate') intermediate  $2      ;;  # intermediate
  'certificate')  certificate   $2 $3   ;;  # client localhost
  'revoke')       revoke        $2      ;;  # XXX <- intermediate/database[3]column
  'setup')        setup                 ;;
  *)              use                   ;;
esac

